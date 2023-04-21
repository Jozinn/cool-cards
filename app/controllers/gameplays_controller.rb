class GameplaysController < ApplicationController
    def edit
        @game = Game.find(params[:id])
        @gameplay = @game.settings.gameplay
        @gameplay.update(gameplay_params)
        render json: @game, include: [:players, :settings => {include: [:gameplay, :cardpacks => {include: [:white_cards, :black_cards]}]}]
    end

    private
    def gameplay_params
        params.require(:gameplay).permit(:write_ins, :host_judge, :winner_judge, :players_limit, :points_to_win, :timeout)
    end
end
