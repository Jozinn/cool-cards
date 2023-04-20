class PlayerDefaults < ActiveRecord::Migration[7.0]
  def change
    change_column_default :players, :is_host, false
    change_column_default :players, :is_czar, false
    change_column_default :players, :played, false
    change_column_default :players, :score, 0
  end
end
