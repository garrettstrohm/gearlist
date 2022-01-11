class User < ApplicationRecord
    has_many :user_trips 
    has_many :user_items
    has_many :items, through: :user_items
    has_many :trips
    
    has_secure_password
    validates :user_name, presence: true, uniqueness: true
    validates :password, presence: true
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true
end
