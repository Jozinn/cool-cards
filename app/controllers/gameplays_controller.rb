class GameplaysController < ApplicationController
    def edit
        @gameplay = Gameplay.find(params[:id])
        @gameplay.update(gameplay_params)
    end

    private
    def gameplay_params
        params.require(:gameplay).permit(:write_ins, :host_judge, :winner_judge, :players_limit, :points_to_win, :timeout)
    end
end
