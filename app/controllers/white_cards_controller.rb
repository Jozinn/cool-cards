class WhiteCardsController < ApplicationController
    def create
        @cardpack = Cardpack.find(params[:id])
        @cardpack.white_cards.create(content: content)
        render json: @cardpack, include: [:white_cards, :black_cards]
    end

    def destroy
        @white_card = WhiteCard.find(params[:id])
        @id = @white_card.cardpack.id
        @white_card.destroy
        @cardpack = Cardpack.find(@id)
        render json: @cardpack, include: [:white_cards, :black_cards]
    end
end
