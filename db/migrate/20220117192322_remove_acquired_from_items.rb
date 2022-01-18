class RemoveAcquiredFromItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :acquired
  end
end
