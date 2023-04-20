class BlackCardsController < ApplicationController
    def create
        @cardpack = Cardpack.find(params[:id])
        @cardpack.black_cards.create(card_params)
        render json: @cardpack
    end

    def destroy
        @black_card = BlackCard.find(params[:id])
        @id = @black_card.cardpack.id
        @black_card.destroy
        @cardpack = Cardpack.find(@id)
        render json: @cardpack
    end

    private
    def card_params
        params.require(:card).permit(:content, :white_number)
    end
end
