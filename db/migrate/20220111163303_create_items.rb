class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.bigint :quantity
      t.text :description
      t.string :image
      t.boolean :acquired

      t.timestamps
    end
  end
end
