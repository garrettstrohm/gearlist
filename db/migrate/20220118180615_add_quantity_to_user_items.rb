class AddQuantityToUserItems < ActiveRecord::Migration[7.0]
  def change
    add_column :user_items, :quantity, :bigint
  end
end
