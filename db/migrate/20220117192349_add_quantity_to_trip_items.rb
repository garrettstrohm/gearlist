class AddQuantityToTripItems < ActiveRecord::Migration[7.0]
  def change
    add_column :trip_items, :quantity, :bigint
  end
end
