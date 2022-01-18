class TripItemsController < ApplicationController

    def index
        items = TripItem.where(trip_id: params[:id])
        render json: items, status: :ok
    end

    def create
        item = Item.find_or_create_by(name: params[:name], description: params[:description], image: params[:image])
        trip_item = item.trip_items.create!(trip_id: params[:trip_id], quantity: params[:quantity], acquired: params[:acquired])
        render json: trip_item, status: :created
    end

    def update
        target_item = find_item
        target_item.update!(trip_items_params)
        render json: target_item, status: :ok
    end

    def destroy
        target_item = find_item
        target_item.destroy
        head :no_content
    end

    private

    def find_item
        TripItem.find(params[:id])
    end

    def trip_items_params
        params.permit(:id, :trip_id, :item_id, :quantity, :acquired)
    end

end
