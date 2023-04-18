class Cardpack < ApplicationRecord
    has_many :black_cards
    has_many :white_cards
end
