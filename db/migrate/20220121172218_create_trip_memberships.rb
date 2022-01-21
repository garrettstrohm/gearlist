class CreateTripMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :trip_memberships do |t|
      t.datetime :last_read_at
      t.references :user, null: false, foreign_key: true
      t.references :trip, null: false, foreign_key: true

      t.timestamps
    end
  end
end
