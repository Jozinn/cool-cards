class CreateBlackCards < ActiveRecord::Migration[7.0]
  def change
    create_table :black_cards do |t|
      t.belongs_to :cardpack, foreign_key: true
      t.string :content
      t.integer :white_number
      t.timestamps
    end
  end
end
