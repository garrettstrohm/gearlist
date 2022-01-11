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

ActiveRecord::Schema.define(version: 2022_01_11_234713) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.bigint "quantity"
    t.text "description"
    t.string "image"
    t.boolean "acquired"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "trip_items", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "trip_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_trip_items_on_item_id"
    t.index ["trip_id"], name: "index_trip_items_on_trip_id"
  end

  create_table "trips", force: :cascade do |t|
    t.string "title"
    t.string "image"
    t.string "date"
    t.string "location"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_trips_on_user_id"
  end

  create_table "user_adventure_items", force: :cascade do |t|
    t.bigint "adventure_id", null: false
    t.bigint "item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["adventure_id"], name: "index_user_adventure_items_on_adventure_id"
    t.index ["item_id"], name: "index_user_adventure_items_on_item_id"
  end

  create_table "user_items", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "trip_id", null: false
    t.index ["item_id"], name: "index_user_items_on_item_id"
    t.index ["trip_id"], name: "index_user_items_on_trip_id"
    t.index ["user_id"], name: "index_user_items_on_user_id"
  end

  create_table "user_trips", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "trip_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["trip_id"], name: "index_user_trips_on_trip_id"
    t.index ["user_id"], name: "index_user_trips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.text "phone_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "trip_items", "items"
  add_foreign_key "trip_items", "trips"
  add_foreign_key "trips", "users"
  add_foreign_key "user_adventure_items", "items"
  add_foreign_key "user_adventure_items", "user_trips", column: "adventure_id"
  add_foreign_key "user_items", "items"
  add_foreign_key "user_items", "trips"
  add_foreign_key "user_items", "users"
  add_foreign_key "user_trips", "trips"
  add_foreign_key "user_trips", "users"
end
