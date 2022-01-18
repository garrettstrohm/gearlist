class AddAcquiredToUserItems < ActiveRecord::Migration[7.0]
  def change
    add_column :user_items, :acquired, :boolean
  end
end
