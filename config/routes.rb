Rails.application.routes.draw do
  resources :messages
  resources :trip_memberships
  resources :adventure_items
  resources :user_adventure_items
  resources :user_items
  resources :trip_items
  resources :user_trips
  resources :adventures
  resources :items
  resources :trips
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  patch "/password/:id", to: "passwords#update"
  post '/forgot_password', to: "passwords#forgot"
  post '/reset_password', to: "passwords#reset"
  get '/adventurers/:id', to: "user_trips#adventurers"
  delete '/user_trips/delete/:id', to: 'user_trips#destroy_adventure'
  get '/this_trips_items/:id', to: 'trip_items#index'
  get '/this_trips_user_items/:id', to: 'user_items#index'
  get '/this_trips_adventure_items/:id', to: 'adventure_items#index'
  post '/images', to: 'images#create'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
  mount ActionCable.server => '/cable'

end
