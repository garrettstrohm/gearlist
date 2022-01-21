class TripMembershipSerializer < ActiveModel::Serializer
  attributes :id, :last_read_at
  has_one :user
  has_one :trip
end
