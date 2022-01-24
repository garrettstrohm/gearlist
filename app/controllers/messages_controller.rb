class MessagesController < ApplicationController

    def index
        trip_id_array = current_user.trip_memberships.pluck(:trip_id)
        messages = Message.where(trip_id: trip_id_array)
        render json: messages, status: :ok
    end
  
    def show
        messages = Message.where(trip_id: params[:id])
        render json: messages, include: ['user'], status: :ok
    end

    def create
        message = Message.create!(message_params)
        trip = Trip.find(message.trip_id)
        MessagesChannel.broadcast_to(trip, message)
        render json: message, status: :created
    end

    private

    def message_params
        params.permit(:user_id, :trip_id, :content, :username)
    end
end
