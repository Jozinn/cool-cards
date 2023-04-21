class PlayerWinner < ActiveRecord::Migration[7.0]
  def change
    add_column :players, :is_winner, :boolean, default: false
  end
end
