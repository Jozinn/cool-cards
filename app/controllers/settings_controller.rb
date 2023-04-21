class SettingsController < ApplicationController
    def update
        @game = Game.find(params[:id])
        @settings = @game.settings
        @cardpack = Cardpack.find(params[:cardpack])
        return @cardpack.errors unless @cardpack
        if params[:action] == 'add'
            @settings.cardpacks << @cardpack
        elsif params[:action] == 'delete'
            @settings.cardpacks.delete(@cardpack)
        end
        render json: @game, include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]
    end

    def destroy
        @settings = Setting.params[:id]
        @settings.cardpacks.clear
        @settings.destroy
    end
end
