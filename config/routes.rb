Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    resources :titles
    resources :replies
  end
  get '*path', to: 'home#index', constraints: lambda { |req|
    # 'rails/active_storage'が含まれているパスはリダイレクト対象外にする
    req.path.exclude? 'rails/active_storage'
  }
end
