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
        render json: @game
    end

    def show
        @game = Game.where(url: params[:id])
        unless @game.players.exists?(current_player)
            @game.players << current_player
        end
        render json: @game
    end

    def index
        @games = Game.all
        render json: @games
    end

    def destroy
        @game = Game.where(url: params[:url])
        @game.destroy
    end
end
