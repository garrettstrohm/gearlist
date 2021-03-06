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

ActiveRecord::Schema[7.0].define(version: 2022_03_07_235247) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adventure_items", force: :cascade do |t|
    t.bigint "user_trip_id", null: false
    t.bigint "item_id", null: false
    t.bigint "quantity"
    t.boolean "acquired"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_adventure_items_on_item_id"
    t.index ["user_trip_id"], name: "index_adventure_items_on_user_trip_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "public_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "content"
    t.bigint "user_id", null: false
    t.bigint "trip_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["trip_id"], name: "index_messages_on_trip_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "trip_items", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "trip_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "quantity"
    t.boolean "acquired"
    t.string "public_id"
    t.index ["item_id"], name: "index_trip_items_on_item_id"
    t.index ["trip_id"], name: "index_trip_items_on_trip_id"
  end

  create_table "trip_memberships", force: :cascade do |t|
    t.datetime "last_read_at"
    t.bigint "user_id", null: false
    t.bigint "trip_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_trip_memberships_on_trip_id"
    t.index ["user_id"], name: "index_trip_memberships_on_user_id"
  end

  create_table "trips", force: :cascade do |t|
    t.string "title"
    t.string "image"
    t.string "date"
    t.string "location"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "public_id"
    t.index ["user_id"], name: "index_trips_on_user_id"
  end

  create_table "user_items", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "trip_id", null: false
    t.bigint "quantity"
    t.boolean "acquired"
    t.index ["item_id"], name: "index_user_items_on_item_id"
    t.index ["trip_id"], name: "index_user_items_on_trip_id"
    t.index ["user_id"], name: "index_user_items_on_user_id"
  end

  create_table "user_trips", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "trip_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_user_trips_on_trip_id"
    t.index ["user_id"], name: "index_user_trips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.text "phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "recovery_password_digest"
  end

  add_foreign_key "adventure_items", "items"
  add_foreign_key "adventure_items", "user_trips"
  add_foreign_key "messages", "trips"
  add_foreign_key "messages", "users"
  add_foreign_key "trip_items", "items"
  add_foreign_key "trip_items", "trips"
  add_foreign_key "trip_memberships", "trips"
  add_foreign_key "trip_memberships", "users"
  add_foreign_key "trips", "users"
  add_foreign_key "user_items", "items"
  add_foreign_key "user_items", "trips"
  add_foreign_key "user_items", "users"
  add_foreign_key "user_trips", "trips"
  add_foreign_key "user_trips", "users"
end
