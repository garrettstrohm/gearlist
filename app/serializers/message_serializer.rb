class MessageSerializer < ActiveModel::Serializer
  attributes :content, :created_at, :trip_id

end
