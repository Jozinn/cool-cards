class CreateSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :settings do |t|
      t.belongs_to :game, foreign_key: true
      t.timestamps
    end
  end
end
