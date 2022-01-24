class Trip < ApplicationRecord
  belongs_to :user
  has_many :trip_items, dependent: :destroy
  has_many :items, through: :trip_items
  has_many :user_trips, dependent: :destroy
  has_many :adventures, through: :user_trips, source: :user
  has_many :user_items, through: :user, dependent: :destroy
  has_many :trip_memberships
  has_many :messages


  validates :title, :date, :location, presence: true
end
