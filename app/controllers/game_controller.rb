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
        render json: @game, include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites, :current_Black]
    end

    def show
        @game = Game.where(url: params[:id])
        unless @game.players.exists?(current_player)
            @game.players << current_player
        end
        render json: @game, include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites, :current_Black]
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
        ActionCable.server.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites, :current_Black]))
    end

    def start_round
        @game = Game.where(url: params[:url])
        @game.update(stage: 'play')
        ActionCable.server.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites, :current_Black]))
    end

    def play
        @game = Game.where(url: params[:url])
        @player = current_player
        @card = WhiteCard.find(params[:card])
        @player.play(@card)
        @player.update(played: true)
        @game.current_whites << @card
    end

    def choose
        @game = Game.where(url: params[:url])
        @player = current_player
        @card = WhiteCard.find(params[:card])
        return unless @player.is_czar
        @card.players[0].update(score: @card.players[0].score + 1, is_czar: true)
        @player.update(is_czar: false)
        ActionCable.servevr.broadcast('game', @game.as_json(include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}, :current_whites, :current_Black]))
    end
end
