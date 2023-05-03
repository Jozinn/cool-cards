class PlayersController < ApplicationController
    before_action :redirect_if_authenticated, only: :create

    def create
        @player = Player.new(name: params[:name])
        if @player.save
            login_player @player
            render json: @player
        else 
            render json: @player.errors, status: :unprocessable_entity
        end
    end

    def update
        @player = Player.find(params[:id])
        if @player.update(player_params)
            render json: @player
        else
            render json: @player.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @player = current_player
        @player.white_cards.clear
        logout_player
        @player.destroy
    end

    def show
        @player = Player.find(params[:id])
        render json: @player
    end

    private
    def player_params
        params.require(:player).permit(:is_host, :is_czar, :played, :name, :is_winner, :score, :name, :game_id)
    end
end
