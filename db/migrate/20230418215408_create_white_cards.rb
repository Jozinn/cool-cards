class CreateWhiteCards < ActiveRecord::Migration[7.0]
  def change
    create_table :white_cards do |t|
      t.belongs_to :cardpack, foreign_key: true
      t.string :content
      t.timestamps
    end
  end
end
