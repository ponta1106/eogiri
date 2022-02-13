Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    resources :titles do
      resources :replies
    end
  end
  get '*path', to: 'home#index'
end
