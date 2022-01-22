class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @trip = Trip.find(params[:id])
    stream_for @trip
  end

  def receive(data)
    message = Message.create(content: data['content'], user_id: data['userId'], trip_id: data['tripId'])
    MessageRelayJob.perform_later(message)
  end

  def unsubscribed
    stop_all_streams
  end
end
