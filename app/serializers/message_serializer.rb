class MessageSerializer < ActiveModel::Serializer
  attributes :content, :created_at
  has_one :user
  has_one :trip
end
