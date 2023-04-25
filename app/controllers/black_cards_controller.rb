class BlackCardsController < ApplicationController
    before_action :authenticate_admin!
    
    def create
        @cardpack = Cardpack.find(params[:id])
        @cardpack.black_cards.create(card_params)
        render json: @cardpack, include: [:black_cards, :white_cards]
    end

    def destroy
        @black_card = BlackCard.find(params[:id])
        @id = @black_card.cardpack.id
        @black_card.destroy
        @cardpack = Cardpack.find(@id)
        render json: @cardpack, include: [:white_cards, :black_cards]
    end

    private
    def card_params
        params.require(:card).permit(:content, :white_number)
    end
end
