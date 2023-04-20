class Setting < ApplicationRecord
    belongs_to :game
    has_one :gameplay, dependent: :destroy
    has_and_belongs_to_many :cardpacks
end
