class AddAcquiredToTripItems < ActiveRecord::Migration[7.0]
  def change
    add_column :trip_items, :acquired, :boolean
  end
end
