class PasswordsController < ApplicationController

    def forgot
        user = User.find_by(email: params[:email])
        user.password_reset_token = generate_base64_token
        user.password_reset_sent_at = Time.zone.now
        PasswordMailer.password_reset(user).deliver_now
        render json: { alert: "If this user exists, we have sent you a password reset email."}
    end
    
    def reset
        user = User.find_by(password_reset_token: params[:token], email: params[:email])
        if user.present? && user.password_token_valid?
            user.update!(password: params[:password], password_confirmation: params[:password_confirmation], password_reset_token)
            session[:user_id] = user.id
            render json: user, status: :ok
        end
    end

    private

    def password_params
        params.permit(:password, :password_confirmation)
    end

    def generate_base64_token
        SecureRandom.urlsafe_base64
    end
end
