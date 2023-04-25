class Player < ApplicationRecord
    belongs_to :game
    has_and_belongs_to_many :white_cards

    attr_accessor :cards_played, :whites

    @cards_played = 0
    @whites = []

    def draw_card
        game = self.game
        return nil unless game
        cardpack = game.settings.cardpacks[rand(game.settings.cardpacks.size)]
        card = cardpack.white_cards[rand(cardpack.white_cards.size)]
        if card.players.empty?
            self.whites << card
        else
            draw_card()
        end
    end
    
    def get_hand
        10.times do
            draw_card()
        end
    end

    def play(card)
        c = WhiteCard.find(card)
        self.white_cards << c
        self.whites.delete(c)
        draw_card()
        @cards_played += 1
    end
end
