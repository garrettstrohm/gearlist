class TripsController < ApplicationController
    before_action :find_trip
    skip_before_action :find_trip, only: [:index, :create]

    def index
        render json: current_user.trips, status: :ok
    end

    def show
        if current_user.id == find_trip.user_id
            render json: find_trip, status: :ok
        end
    end

    def create
        trip = current_user.trips.create!(trip_params)
        render json: trip, status: :created
    end

    private

    def find_trip
        current_user.trips.find(params[:id])
    end

    def trip_params
        params.permit(:title, :image, :date, :location)
    end

end
