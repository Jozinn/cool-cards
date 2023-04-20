class Cardpack < ApplicationRecord
    has_many :black_cards, dependent: :destroy
    has_many :white_cards, dependent: :destroy
    has_and_belongs_to_many :settings
end
