class PlayersController < ApplicationController
    before_action :redirect_if_authenticated, only: :create

    def create
        @player = Player.new(name: params[:name])
        if @player.save
            login @player
            render json: @player
        else 
            render json: @player, status: :unprocessable_entity
        end
    end

    def destroy
        @player = Player.find(params[:id])
        logout
        @played.destroy
    end

    def show
        @player = Player.find(params[:id])
        render json: @player
    end
end
