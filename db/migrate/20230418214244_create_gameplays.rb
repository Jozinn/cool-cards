class CreateGameplays < ActiveRecord::Migration[7.0]
  def change
    create_table :gameplays do |t|
      t.belongs_to :setting, foreign_key: true
      t.boolean :write_ins
      t.boolean :host_judge
      t.boolean :winner_judge
      t.integer :players_limit
      t.integer :timeout
      t.integer :points_to_win
      t.timestamps
    end
  end
end
