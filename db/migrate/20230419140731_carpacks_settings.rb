class CarpacksSettings < ActiveRecord::Migration[7.0]
  def change
    create_join_table :cardpacks, :settings do |t|
      t.index :cardpack_id
      t.index :setting_id
    end
  end
end
