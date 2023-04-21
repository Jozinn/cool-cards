# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_21_194132) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "black_cards", force: :cascade do |t|
    t.bigint "cardpack_id"
    t.string "content"
    t.integer "white_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cardpack_id"], name: "index_black_cards_on_cardpack_id"
  end

  create_table "cardpacks", force: :cascade do |t|
    t.string "name"
    t.string "author"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cardpacks_settings", id: false, force: :cascade do |t|
    t.bigint "cardpack_id", null: false
    t.bigint "setting_id", null: false
    t.index ["cardpack_id"], name: "index_cardpacks_settings_on_cardpack_id"
    t.index ["setting_id"], name: "index_cardpacks_settings_on_setting_id"
  end

  create_table "gameplays", force: :cascade do |t|
    t.bigint "setting_id"
    t.boolean "write_ins", default: false
    t.boolean "host_judge", default: false
    t.boolean "winner_judge", default: false
    t.integer "players_limit", default: 12
    t.integer "timeout", default: 60
    t.integer "points_to_win", default: 12
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["setting_id"], name: "index_gameplays_on_setting_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stage", default: "wait_game"
    t.integer "current_black"
  end

  create_table "games_white_cards", id: false, force: :cascade do |t|
    t.bigint "game_id", null: false
    t.bigint "white_card_id", null: false
    t.index ["game_id"], name: "index_games_white_cards_on_game_id"
    t.index ["white_card_id"], name: "index_games_white_cards_on_white_card_id"
  end

  create_table "players", force: :cascade do |t|
    t.boolean "is_host", default: false
    t.boolean "is_czar", default: false
    t.boolean "played", default: false
    t.string "name"
    t.integer "score", default: 0
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_winner", default: false
    t.index ["game_id"], name: "index_players_on_game_id"
  end

  create_table "players_white_cards", id: false, force: :cascade do |t|
    t.bigint "player_id", null: false
    t.bigint "white_card_id", null: false
    t.index ["player_id"], name: "index_players_white_cards_on_player_id"
    t.index ["white_card_id"], name: "index_players_white_cards_on_white_card_id"
  end

  create_table "settings", force: :cascade do |t|
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_settings_on_game_id"
  end

  create_table "white_cards", force: :cascade do |t|
    t.bigint "cardpack_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "highlight", default: true
    t.index ["cardpack_id"], name: "index_white_cards_on_cardpack_id"
  end

  add_foreign_key "black_cards", "cardpacks"
  add_foreign_key "gameplays", "settings"
  add_foreign_key "players", "games"
  add_foreign_key "settings", "games"
  add_foreign_key "white_cards", "cardpacks"
end
