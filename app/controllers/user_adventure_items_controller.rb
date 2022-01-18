class UserAdventureItemsController < ApplicationController

    def index
        items = UserAdventureItem.where(user_trip_id: params[:id])
        render json: items, status: ok
    end

end
