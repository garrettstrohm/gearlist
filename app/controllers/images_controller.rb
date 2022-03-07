require 'cloudinary'

class ImagesController < ApplicationController

    def create
        debugger
        Cloudinary::Uploader.upload(params[:fileName])
    end
end
