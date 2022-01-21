class TripMembershipsController < ApplicationController

    def index
        render json: current_user.trip_memberships, status: :ok
    end

    def create
        mem = TripMembership.create!(membership_params)
        render json: mem, status: :created
    end

    private

    def membership_params
        params.permit(:user_id, :trip_id, :last_read_at)
    end
end
