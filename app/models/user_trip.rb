class UserTrip < ApplicationRecord
  belongs_to :user
  belongs_to :trip
  has_many :user_adventure_items
  has_many :items, through: :user_adventure_items
end
