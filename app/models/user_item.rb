class UserItem < ApplicationRecord
  belongs_to :item
  belongs_to :user
  belongs_to :trip
end
