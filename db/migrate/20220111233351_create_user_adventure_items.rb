class CreateUserAdventureItems < ActiveRecord::Migration[7.0]
  def change
    create_table :user_adventure_items do |t|
      t.belongs_to :user_trip, null: false, foreign_key: true
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
