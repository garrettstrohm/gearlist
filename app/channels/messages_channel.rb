class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @trip = Trip.find(params[:id])
    stream_for @trip
  end

  def receive(data)
    user = User.find_by(id: params['userId'])
    message = @trip.messages.create(content: data['content'], user: user)
    MessageRelayJob.perform_later(message)
  end

  def unsubscribed
    stop_all_streams
  end
end
