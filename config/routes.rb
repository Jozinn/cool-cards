Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'
  root to: 'sessions#destroy'
  resources :admins, only: [:create, :update]
  resources :black_cards, only: [:create, :destroy]
  resources :cardpacks, only: [:create, :destroy, :index, :show]
  resources :gameplays, only: :update
  resources :players, only: [:create, :destroy, :show]
  resources :sessions, only: :create
  resources :settings, only: [:update, :destroy]
  resources :white_cards, only: [:create, :destroy]
  resources :games, only: [:create, :destroy, :index, :show]
  get '/games/:id/start', to: 'games#start'
  get '/games/:id/start_round', to: 'games#start_round'
  get '/games/:id/play/:card', to: 'games#play'
  get '/games/:id/choose/:card', to: 'games#choose'
  get '/games/:id/kick/:player', to: 'games#kick'
  get '/games/:id/show_up', to: 'games#show_up'
  # Defines the root path route ("/")
  # root "articles#index"
end
