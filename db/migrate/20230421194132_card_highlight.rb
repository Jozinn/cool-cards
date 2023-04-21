class CardHighlight < ActiveRecord::Migration[7.0]
  def change
    add_column :white_cards, :highlight, :boolean, default: true
  end
end
