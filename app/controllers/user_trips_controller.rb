class UserTripsController < ApplicationController

    def index
        user = current_user
        adventures = UserTrip.where(user_id: user.id)
        render json: adventures, status: :ok
    end

    def show
        adventure = UserTrip.find(params[:id])
        render json: adventure, include: ['trip.user'], status: :ok
    end

    def create
        user = User.find_by(email: params[:email])
        if user
            adventure = user.user_trips.create!(trip_id: params[:trip_id])
            TripMembership.create!(user_id: user.id, trip_id: params[:trip_id])
            UserMailer.added_adventurer_email(user, adventure).deliver_later
            render json: adventure, status: :created
        else
            render json: {error: 'A user with that email cannot be found.'}, status: :unprocessable_entity
        end
    end

    def destroy
        adventure = UserTrip.find(params[:id])
        return render json: {error: 'You are not the trip organizer! You can\'t delete another adventurer!'}, status: :unauthorized unless adventure.trip.user_id === current_user.id
        adventure.destroy
        head :no_content
    end

    def destroy_adventure
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
