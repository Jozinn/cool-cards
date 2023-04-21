class CardpacksController < ApplicationController
    def create
        @cardpack = Cardpack.new
        if @cardpack.save
            render json: @cardpack, include: [:white_cards, :black_cards]
        else
            render @cardpack.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @cardpack = Cardpack.find(params[:id])
        @cardpack.destroy
    end

    def index
        @cardpacks = Cardpack.all
        render json: @cardpacks
    end

    def show
        @cardpack = Cardpack.find(params[:id])
        render json: @cardpack, include: [:white_cards, :black_cards]
    end
end
