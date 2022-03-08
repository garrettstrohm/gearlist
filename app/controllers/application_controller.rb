class ApplicationController < ActionController::API
    include ActionController::Cookies
    before_action :set_auth, :current_user

    wrap_parameters format: []

  rescue_from ActiveRecord::RecordInvalid, with: :rescue_from_record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

private

    def authorize
        return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

    def rescue_from_record_invalid invalid
        render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def not_found(exception)
        render json: {errors: "#{exception.model} not found."}, status: :not_found
    end

    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def set_auth
        @auth = {
            cloud_name: ENV["CLOUD_NAME"],
            api_key: ENV["API_KEY"],
            api_secret: ENV["API_SECRET"]
        }
    end

    def delete_cloudinary_photo public_id
        Cloudinary::Uploader.destroy(public_id, @auth)
    end
      
end
