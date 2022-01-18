class UserTripsController < ApplicationController

    def index
        render json: current_user.adventures, status: :ok
    end

    def show
        user = current_user
        adventure = user.adventures.find(params[:id])
        render json: adventure, status: :ok
    end

    def create
        adventure = User.find_by(email: params[:email]).adventures.create!(trip_id: params[:trip_id])
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
end
