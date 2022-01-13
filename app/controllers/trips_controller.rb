class TripsController < ApplicationController

    def index
        render json: current_user.trips, status: :ok
    end

end
