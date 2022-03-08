class UserItemsController < ApplicationController

    def index
        user = current_user
        items = UserItem.where(trip_id: params[:id], user_id: user.id)
        render json: items, status: :ok
    end

    def create
        item = Item.find_or_create_by(name: params[:name], description: params[:description], image: params[:image], public_id: params[:public_id])
        user_item = item.user_items.create!(user_id: params[:user_id], trip_id: params[:trip_id], quantity: params[:quantity], acquired: params[:acquired])
        render json: user_item, status: :created
    end

    def update
        target_item = find_item
        target_item.update!(user_items_params)
        render json: target_item, status: :ok
    end

    def destroy
        target_item = find_item
        item = target_item.item
        delete_cloudinary_photo(item.public_id) if item.public_id
        target_item.destroy
        head :no_content
    end

    private 

    def find_item
        UserItem.find(params[:id])
    end

    def user_items_params
        params.permit(:id, :trip_id, :item_id, :user_id, :quantity, :acquired)
    end

end
