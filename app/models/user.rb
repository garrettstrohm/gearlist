class User < ApplicationRecord
    has_many :user_trips, dependent: :destroy 
    has_many :adventures, through: :user_trips, source: :trip
    has_many :user_items, dependent: :destroy
    has_many :items, through: :user_items
    has_many :trips, dependent: :destroy
    
    has_secure_password
    has_secure_password :recovery_password, validations: false
    validates :username, presence: true, uniqueness: true
    validates :phone_number, :first_name, :last_name, presence: true, uniqueness: true
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true

end
