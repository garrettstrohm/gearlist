class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :description, :image, :acquired
end
