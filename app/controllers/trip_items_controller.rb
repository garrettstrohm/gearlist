class TripItemsController < ApplicationController

    def index
        items = TripItems.find_by(trip_id: params[:id])
        render json: items, status: :ok
    end

    def create
        item = Item.find_or_create_by(item_params).trip_items.create!(trip_id: params[:id], quantity: params[:quantity], acquired: false)
        render json: item, status: :created
    end

    private

    def trip_items_params
        params.permit(:trip_id, :item_id, :quantity, :acquired)
    end

    def item_params
        params.permit(:name, :description, :image)
    end
end
