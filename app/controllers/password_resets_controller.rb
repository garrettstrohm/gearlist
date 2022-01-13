class PasswordResetsController < ApplicationController

    def create
        @user = User.find_by(email: params[:email])

        if @user.present?
            #send email
            PasswordMailer.with(user: @user).reset.deliver_later
            render json: ["Successfully sent an email to reset password to #{@user.email}. It will expire in 15 minutes."], status: :created
        end
    end

    def update
        @user = User.find_signed(params[:token], purpose: "password_reset")
        render json: ["This is the params #{params[:token]}"]
    rescue ActiveSupport::MessageVerifier::InvalidSignature
        render json: {errors: ["Your token has expired. Please try again"]}, status: :request_timeout
    end

end
