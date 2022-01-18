class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image
  has_many :trip_items
end
