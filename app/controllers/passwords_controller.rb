class PasswordsController < ApplicationController
    before_action :find_user

    def update
        user = User.find(params[:id])
        if user&.authenticate(params[:old_password])
            user.update!(password_params)
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: {error: 'Unable to process request. Please check to make sure your old password is correct, and that your new password and confirmation match.'}, status: :unauthorized
        end
    end

    def forgot
        token = generate_base64_token
        @user.update!(recovery_password: token)
        if @user.recovery_password_digest != nil
            PasswordMailer.password_reset(@user).deliver_now
            render json: { alert: "Your custom alert here."}
        else
            render json: {error: "Your custom error message here."}
        end
    end

    def reset
        if @user&.authenticate_recovery_password(params[:recovery_password])
            @user.update!(password_params)
            session[:user_id] = @user.id
            render json: @user, status: :ok
        else
            render json: {error: "Your custom error message here."}
        end
    end

    private

    def find_user
       @user = User.find_by(email: params[:email])
    end

    def password_params
        params.permit(:password, :password_confirmation, :old_password, :recovery_password, :email)
    end

    def generate_base64_token
        SecureRandom.urlsafe_base64
    end
end
