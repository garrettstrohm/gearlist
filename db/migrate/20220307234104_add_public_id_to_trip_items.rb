class AddPublicIdToTripItems < ActiveRecord::Migration[7.0]
  def change
    add_column :trip_items, :public_id, :string
  end
end
