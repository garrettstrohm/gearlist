class TripItem < ApplicationRecord
  belongs_to :item
  belongs_to :trip
end
