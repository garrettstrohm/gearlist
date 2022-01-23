class TripMembership < ApplicationRecord
  belongs_to :user
  belongs_to :trip
  has_many :messages, through: :trip
  has_many :messages, through: :user
end
