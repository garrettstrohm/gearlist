class UserAdventureItemSerializer < ActiveModel::Serializer
  attributes :id
  has_one :adventure
  has_one :item
end
