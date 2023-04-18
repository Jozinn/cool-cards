class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.boolean :is_host
      t.boolean :is_czar
      t.boolean :played
      t.string :name
      t.integer :score
      t.belongs_to :game, foreign_key: true
      t.timestamps
    end
  end
end
