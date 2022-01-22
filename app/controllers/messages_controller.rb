class MessagesController < ApplicationController

    def index
        render json: current_user.messages, status: :ok
    end


    def create
        message = current_user.messages.create!(message_params)
        render json: message, status: :created
    end

    private

    def message_params
        params.permit(:user_id, :trip_id, :content)
    end
end
