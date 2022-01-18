class TripSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :date, :location, :description
  has_one :user
  has_many :trip_items
end
