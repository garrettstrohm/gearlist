class User < ApplicationRecord
    has_many :user_trips 
    has_many :adventures, through: :user_trips, source: :trip
    has_many :user_items
    has_many :items, through: :user_items
    has_many :trips
    
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true, uniqueness: true

    def send_password_reset
        self.password_reset_token = generate_base64_token
        self.password_reset_sent_at = Time.zone.now
        save!
        PasswordMailer.password_reset(self).deliver_now
    end

    def password_token_valid?
        (self.password_reset_sent_at + 1.hour) > Time.zone.now
    end

    def reset_password(password)
        self.password_reset_token = nil
        self.password = password
        save!
    end

    private

    def generate_base64_token
        SecureRandom.urlsafe_base64
    end
end
