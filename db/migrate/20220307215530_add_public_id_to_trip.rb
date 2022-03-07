class AddPublicIdToTrip < ActiveRecord::Migration[7.0]
  def change
    add_column :trips, :public_id, :string
  end
end
