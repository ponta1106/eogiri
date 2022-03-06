Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    resources :titles
    resources :replies
  end
  get '*path', to: 'home#index'
end
