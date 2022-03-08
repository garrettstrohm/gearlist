class ItemsController < ApplicationController

    def create
        item = Item.create!(item_params)
        render json: item, status: :created
    end

    private

    def item_params
        params.permit(:name, :description, :image, :public_id)
    end
    
end
