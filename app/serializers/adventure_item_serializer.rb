class AdventureItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :acquired
  has_one :user_trip
  has_one :item
end
