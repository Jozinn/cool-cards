class Game < ApplicationRecord
    has_one :settings
    has_many :players
end
