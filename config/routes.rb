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
  post "password/reset", to: "password_resets#create"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
