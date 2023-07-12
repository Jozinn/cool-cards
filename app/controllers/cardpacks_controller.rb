class CardpacksController < ApplicationController
    before_action :authenticate_admin!, only: [:create, :destroy]

    def create
        @cardpack = Cardpack.new(name: params[:name], author: current_admin.id)
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
        @cardpacks = Cardpack.where(author: params[:admin])
        render json: @cardpacks, include: [:white_cards, :black_cards]
    end

    def show
        @cardpack = Cardpack.find(params[:id])
        render json: @cardpack, include: [:white_cards, :black_cards]
    end
end
