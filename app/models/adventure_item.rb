class AdventureItem < ApplicationRecord
  belongs_to :user_trip
  belongs_to :item
end
