class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :description, :image, :acquired
  has_many :trip_items
end
