class ItemsController < ApplicationController

    def create
        item = Item.create!(item_params)
        trip_item = TripItem.create!(item_id: item.id, trip_id: params[:id])
        render json: item, status: :created
    end

    private

    def item_params
        params.permit(:name, :description, :image)
    end

end
