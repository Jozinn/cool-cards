class Game < ApplicationRecord
    has_one :settings, dependent: :destroy
    has_many :players, dependent: :nullify
    validates :url, uniqueness: true
end
