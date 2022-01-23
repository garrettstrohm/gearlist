class MessageSerializer < ActiveModel::Serializer
  attributes :content, :created_at, :trip_id, :username
  has_one :user

  def username
    object.user.username
  end
  
end
