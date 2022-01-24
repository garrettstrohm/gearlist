class UserTripsController < ApplicationController

    def index
        user = current_user
        adventures = UserTrip.where(user_id: user.id)
        render json: adventures, status: :ok
    end

    def show
        adventure = UserTrip.find(params[:id])
        render json: adventure, status: :ok
    end

    def create
        user = User.find_by(email: params[:email])
        adventure = user.user_trips.create!(trip_id: params[:trip_id])
        TripMembership.create!(user_id: user.id, trip_id: params[:trip_id])
        render json: adventure, status: :created
    end

    def destroy
        adventure = UserTrip.find(params[:id])
        adventure.destroy
        head :no_content
    end

    def adventurers
        adventurers = UserTrip.where(trip_id: params[:id])
        render json: adventurers, status: :ok
    end

    private

    def user_trips_params
        params.permit(:id, :user_id, :trip_id)
    end
end
