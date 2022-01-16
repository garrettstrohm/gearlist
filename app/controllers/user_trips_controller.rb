class UserTripsController < ApplicationController

    def index
        render json: current_user.adventures, status: :ok
    end

    def adventurers
        adventurers = current_user.user_trips.where(trip_id: params[:id])
        render json: adventurers, status: :ok
    end
end
