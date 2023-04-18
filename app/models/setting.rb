class Setting < ApplicationRecord
    belongs_to :game
    has_one :gameplay
    has_many :card_packs
end
