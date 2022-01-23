class MessagesChannel < ApplicationCable::Channel
  def subscribed
      @trip = Trip.find(params[:id])
    stream_for @trip
  end

  def unsubscribed
  end
end
