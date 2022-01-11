class Item < ApplicationRecord
    has_many :user_items
    has_many :trip_items
    has_many :users, through: :user_items
    has_many :trips, through: :trip_items

    validates :name, presence: true
end
