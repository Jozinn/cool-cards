class GameWhites < ActiveRecord::Migration[7.0]
  def change
    create_join_table :games, :white_cards do |t|
      t.index :game_id
      t.index :white_card_id
    end
  end
end
