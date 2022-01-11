class Trip < ApplicationRecord
  belongs_to :user
  has_many :trip_items
  has_many :items, through: :trip_items
end
