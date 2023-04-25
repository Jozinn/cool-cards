class GameController < ApplicationController
    before_action :authenticate_user!
    
    def create
        @settings = Setting.create
        @settings.gameplay = Gameplay.new
        @plyer = current_player
        @player.update(is_host: true)
        @game = Game.new(url: params[:url])
        @game.settings = @settings
        @game.players << @player
        render json: @game, include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites]
    end

    def show
        @game = Game.where(url: params[:id])
        unless @game.players.exists?(current_player)
            @game.players << current_player
        end
        render json: @game, include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites]
    end

    def index
        @games = Game.all
        render json: @games
    end

    def destroy
        @game = Game.where(url: params[:url])
        @game.destroy
    end

    def start
        @game = Game.where(url: params[:url])
        @game.players.each do |player|
            player.get_hand
            if player.is_host == true
                player.update(is_czar: true)
            end
        end
        @game.update(stage: 'wait_round')
        ActionCable.server.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites]))
    end

    def start_round
        @game = Game.where(url: params[:url])
        @game.update(stage: 'play', kick: nil, current_black: @game.set_current_black)
        @game.current_whites.clear
        @game.players.each do |player| 
            player.white_cards.clear
            player.update(played: false)
        end
        ActionCable.server.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites]))
    end

    def play
        @game = Game.where(url: params[:url])
        @player = current_player
        return if @player.is_czar
        @card = WhiteCard.find(params[:card])
        @player.play(@card)
        if @player.cards_played >= @game.current_Black.white_number
            @player.update(played: true)
        end
        @game.current_whites << @card
        if @game.players.all? {|player| player.played == true}
            redirect_to("/#{@game.url}/showup")
        end
    end

    def choose
        @game = Game.where(url: params[:url])
        @player = current_player
        @card = WhiteCard.find(params[:card])
        return unless @player.is_czar
        @card.players[0].update(score: @card.players[0].score + 1)
        @player.update(is_czar: false)
        @card.update(highlight: true)
        ActionCable.server.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites]))
        sleep 10
        @card.update(highlight: false)
        @game.update(stage: 'wait_round')
        if @game.settings.gameplay.host_judge
            @host = Player.where(game_id: @game.id, is_host: true)
            @host.update(is_czar: true)
        elsif @game.settings.gameplay.winner_judge
            @card.players[0].update(is_czar: true)
        else
            @current_czar = @game.players.index(@player)
            @new_czar_index = @current_czar < @game.players.length ? (@current_czar + 1) : 0
            @new_czar = Player.find(@new_czar_index)
            @new_czar.update(is_czar: true)
        end
        ActionCable.server.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites]))
    end

    def kick
        @game = Game.where(url: params[:url])
        @player = Player.find(params[:player])
        @game.players.delete(@player)
        @game.update(kick: @player.id)
        ActionCable.server.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites]))
    end

    def show_up
        @game = Game.where(url: params[:url])
        @game.update(stage: 'showup')
        ActionCable.server.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites]))
    end
end
