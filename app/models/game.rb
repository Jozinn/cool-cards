class Game < ApplicationRecord
    has_one :settings, dependent: :destroy, class_name: 'Setting'
    has_many :players, dependent: :nullify
    validates :url, uniqueness: true
    has_and_belongs_to_many :current_whites, class_name: 'WhiteCard'

    attr_accessor :current_black

    @current_black = 0

    def set_current_black
        cardpack = self.settings.cardpacks[rand(self.settings.cardpacks.size)]
        self.current_black = Blackcard.find(cardpack[rand(cardpack.balck_cards.size)])
    end
end
