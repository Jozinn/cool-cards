class CreateCardpacks < ActiveRecord::Migration[7.0]
  def change
    create_table :cardpacks do |t|
      t.string :name
      t.string :author
      t.timestamps
    end
  end
end
