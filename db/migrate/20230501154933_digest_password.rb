class DigestPassword < ActiveRecord::Migration[7.0]
  def change
    rename_column :admins, :secure_password, :password_digest
    add_column :admins, :password, :string
  end
end
