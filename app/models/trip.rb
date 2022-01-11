class Trip < ApplicationRecord
  belongs_to :user
  has_many :trip_items
  has_many :items, through: :trip_items
  has_many :user_trips
  has_many :adventures, through: :user_trips, source: :user
  has_many :user_items, through: :user

  validates :title, :date, :location, presence: true
end
