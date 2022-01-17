class TripItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :acquired, :item
  belongs_to :item
  belongs_to :trip
end
