class UserTripsController < ApplicationController

    def index
        render json: current_user.adventures, status: :ok
    end

    def adventurers
        adventurers = UserTrip.where(trip_id: params[:id])
        render json: adventurers, status: :ok
    end
end
