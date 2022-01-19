class CreateAdventureItems < ActiveRecord::Migration[7.0]
  def change
    create_table :adventure_items do |t|
      t.references :user_trip, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.bigint :quantity
      t.boolean :acquired

      t.timestamps
    end
  end
end
