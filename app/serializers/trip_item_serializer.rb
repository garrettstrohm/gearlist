class TripItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :acquired
  belongs_to :item
  belongs_to :trip
end
