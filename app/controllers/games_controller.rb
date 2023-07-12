class GamesController < ApplicationController
    before_action :authenticate_player!
    
    def create
        @settings = Setting.create
        @settings.gameplay = Gameplay.new
        @player = current_player
        @player.update(is_host: true)
        @game = Game.new
        @game.settings = @settings
        @game.players << @player
        if @game.save
            render json: @game, include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]
        else
            render json: @game.errors, status: :unprocessable_entity
        end        
    end

    def show
        @game = Game.find(params[:id])
        unless @game.players.exists?(current_player) && @game.players.size < @game.settings.gameplay.players_limit
            @game.players << current_player
        end
        render json: @game, include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]
    end

    def index
        @games = Game.all
        render json: @games, include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]
    end

    def destroy
        @game = Game.find_by(url: params[:id])
        @game.destroy
    end

    def start
        @game = Game.find(params[:id])
        return unless @game.players.size >= 3
        @game.players.each do |player|
            player.get_hand
            if player.is_host == true
                player.update(is_czar: true)
            end
        end
        @game.update(stage: 'wait_round')
        GameChannel.broadcast_to(@game, @game.as_json(include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]))
    end

    def update
        @game = Game.find(params[:id])
        if params[:set_black]
            @game.set_current_black
            render json: @game, include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]
        if @game.update(game_params)
            GameChannel.broadcast_to(@game, @game.as_json(include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]))
        else
            GameChannel.broadcast_to(@game, @game.errors)
        end
    end

    private
    def game_params
        params.require(:game).permit(:url, :stage, :current_whites, :kick)
    end

    # def start_round
    #     @game = Game.find_by(url: params[:id])
    #     @game.update(stage: 'play', kick: nil, current_black: @game.set_current_black)
    #     @game.current_whites.clear
    #     @game.players.each do |player| 
    #         player.white_cards.clear
    #         player.update(played: false)
    #     end
    #     GameChannel.broadcast_to(@game, @game.as_json(include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]))
    # end

    # def play
    #     @game = Game.find_by(url: params[:id])
    #     @player = current_player
    #     return if @player.is_czar
    #     @card = WhiteCard.find(params[:card])
    #     @player.play(@card)
    #     if @player.cards_played >= @game.current_Black.white_number
    #         @player.update(played: true)
    #     end
    #     @game.current_whites << @card
    #     if @game.players.all? {|player| player.played == true}
    #         redirect_to("/#{@game.url}/showup")
    #     end
    # end

    # def choose
    #     @game = Game.find_by(url: params[:id])
    #     @player = current_player
    #     @card = WhiteCard.find(params[:card])
    #     return unless @player.is_czar
    #     @card.players[0].update(score: @card.players[0].score + 1)
    #     @player.update(is_czar: false)
    #     @card.update(highlight: true)
    #     GameChannel.broadcast_to(@game, @game.as_json(include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]))
    #     sleep 10
    #     @card.update(highlight: false)
    #     @game.update(stage: 'wait_round')
    #     if @game.settings.gameplay.host_judge
    #         @host = Player.find_by(game_id: @game.id, is_host: true)
    #         @host.update(is_czar: true)
    #     elsif @game.settings.gameplay.winner_judge
    #         @card.players[0].update(is_czar: true)
    #     else
    #         @current_czar = @game.players.index(@player)
    #         @new_czar_index = @current_czar < @game.players.length ? (@current_czar + 1) : 0
    #         @new_czar = Player.find(@new_czar_index)
    #         @new_czar.update(is_czar: true)
    #     end
    #     GameChannel.broadcast_to(@game, @game.as_json(include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]))
    # end

    # def kick
    #     @game = Game.find_by(url: params[:id])
    #     @player = Player.find(params[:player])
    #     @game.players.delete(@player)
    #     @game.update(kick: @player.id)
    #     GameChannel.broadcast_to(@game, @game.as_json(include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]))
    # end

    # def show_up
    #     @game = Game.find_by(url: params[:id])
    #     @game.update(stage: 'showup')
    #     GameChannel.broadcast_to(@game, @game.as_json(include: [:players, :current_whites, :current_black, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]))
    # end
end
