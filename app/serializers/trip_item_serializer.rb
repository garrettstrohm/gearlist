class TripItemSerializer < ActiveModel::Serializer
  attributes :id
  has_one :item
  has_one :trip
end
