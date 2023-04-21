class StagesAndCurrentcards < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :stage, :string, default: 'wait_game'
    add_column :games, :current_black, :integer
  end
end
