class User < ApplicationRecord
    has_many :user_trips 
    has_many :user_items
    has_many :items, through: :user_items
    has_many :trips
    has_many :aadventures, through: :user_trips, source: :trip
end
