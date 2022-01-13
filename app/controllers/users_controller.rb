class UsersController < ApplicationController

    before_action :authorize
    skip_before_action :authorize, only: [:create]

    def show
        render json: current_user, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        # UserMailer.welcome_email(user).deliver_now
        render json: user, status: :created
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :ok
    end

    private

    def user_params
        params.permit(:username, :first_name, :last_name, :email, :phone_number, :password, :password_confirmation, :password_reset_token, :password_reset_sent_at)
    end

end
