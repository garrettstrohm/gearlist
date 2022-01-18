class UserItemsController < ApplicationController

    def index
        items = current_user.user_items.where(trip_id: params[:trip_id])
        render json: items, status: :ok
    end

    def create
        item = Item.find_or_create_by(name: params[:name], description: params[:description], image: params[:image])
        user_item = current_user.user_items.create!(trip_id: params[:trip_id], quantity: params[:quantity], acquired: params[:acquired])
        render json: user_item, status: :created
    end

end
