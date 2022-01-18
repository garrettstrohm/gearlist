class PasswordsController < ApplicationController
    before_action :find_user
    
    def forgot
        user = find_user
        token = generate_base64_token
        user.update!(recovery_password: token)
        if user.recovery_password_digest != nil
            PasswordMailer.password_reset(user).deliver_now
            render json: { alert: "If this user exists, we have sent you a password reset email."}
        end
    end
    
    def reset
        user = find_user
        if user&.authenticate_recovery_password(params[:recovery_password])
            user.update!(password: params[:password], password_confirmation: params[:password_confirmation])
            session[:user_id] = user.id
            render json: user, status: :ok
        end
    end

    private

    def find_user
        User.find_by(email: params[:email])
    end

    def password_params
        params.permit(:password, :password_confirmation)
    end

    def generate_base64_token
        SecureRandom.urlsafe_base64
    end
end
