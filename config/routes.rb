Rails.application.routes.draw do
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
  post "/password/reset", to: "password_resets#create"
  patch "/password/reset/edit", to: "password_resets#update"
  patch "/password", to: "passwords#update"
  post '/forgot_password', to: "passwords#forgot"
  post '/reset_password', to: "passwords#reset"
  get '/adventurers/:id', to: "user_trips#adventurers"
  get '/this_trips_items/:id', to: 'trip_items#index'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
