class RemovePasswordResetTokenFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :password_reset_token
  end
end
