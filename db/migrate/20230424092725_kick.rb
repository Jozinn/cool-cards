class Kick < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :kick, :integer
  end
end
