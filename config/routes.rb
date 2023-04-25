Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: 'game#index'
  resources :admins, only: [:create, :update]
  resources :black_cards, only: [:create, :destroy]
  resources :cardpacks, only: [:create, :destroy, :index, :show]
  resources :gameplays, only: :update
  resources :players, only: [:create, :destroy, :show]
  resources :sessions, only: :create
  resources :settings, only: [:update, :destroy]
  resources :white_cards, only: [:create, :destroy]
  resources :games, only: [:create, :destroy, :index, :show]
  get '/game/:id/start', to: 'games#start'
  get 'game/:id/start_round', to: 'games#start_round'
  get 'game/:id/play/:card' to: 'games#play'
  get 'game/:id/choose/:card', to: 'games#choose'
  get 'game/:id/kick/:player', to: 'games#kick'
  get 'game/:id/show_up', to: 'games#show_up'
  # Defines the root path route ("/")
  # root "articles#index"
end
