class UserTripsController < ApplicationController

    def index
        render json: current_user.adventures, status: :ok
    end
end
