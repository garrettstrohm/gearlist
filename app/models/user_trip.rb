class UserTrip < ApplicationRecord
  belongs_to :user
  belongs_to :trip
  has_many :adventure_items, dependent: :destroy
  has_many :items, through: :adventure_items
end
