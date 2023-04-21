class PlayersWhiteCards < ActiveRecord::Migration[7.0]
  def change
    create_join_table :players, :white_cards do |t|
      t.index :player_id
      t.index :white_card_id
    end
  end
end
