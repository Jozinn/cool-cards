class SettingsDefaults < ActiveRecord::Migration[7.0]
  def change
    change_column_default :gameplays, :write_ins, false
    change_column_default :gameplays, :host_judge, false
    change_column_default :gameplays, :winner_judge, false
    change_column_default :gameplays, :timeout, 60
    change_column_default :gameplays, :players_limit, 12
    change_column_default :gameplays, :points_to_win, 12
  end
end
