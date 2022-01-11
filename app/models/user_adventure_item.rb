class UserAdventureItem < ApplicationRecord
  belongs_to :adventure
  belongs_to :item
end
