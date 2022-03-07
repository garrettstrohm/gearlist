require 'cloudinary'

class TripsController < ApplicationController
    before_action :find_trip
    skip_before_action :find_trip, only: [:index, :create]

    @@auth = {
        cloud_name: ENV["CLOUD_NAME"],
        api_key: ENV["API_KEY"],
        api_secret: ENV["API_SECRET"]
    }
    
    def index
        user = current_user
        render json: user.trips, status: :ok
    end

    def show
        trip = find_trip
        if current_user.id == trip.user_id
            render json: trip, status: :ok
        end
    end

    def create
        trip = current_user.trips.create!(trip_params)
        trip.trip_memberships.create!(user_id: trip.user_id)
        render json: trip, status: :created
    end

    def update
        trip = current_user.trips.find(params[:id]).update!(trip_params)
        render json: trip, status: :ok
    end

    def destroy
        trip = find_trip
        delete_cloudinary_photo(trip.public_id) if trip.public_id
        trip.destroy
        head :no_content
    end

    private

    def find_trip
        Trip.find(params[:id])
    end

    def trip_params
        params.permit(:id, :title, :image, :date, :location, :description, :user_id, :public_id)
    end

    def delete_cloudinary_photo public_id
        Cloudinary::Uploader.destroy(public_id, @@auth)
    end

end
