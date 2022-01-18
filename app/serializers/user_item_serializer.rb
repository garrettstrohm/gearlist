class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :acquired
  has_one :item
  has_one :user
  has_one :trip
end
