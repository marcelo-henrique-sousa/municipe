Rails.application.routes.draw do
  root to: 'static_pages#home'

  resources :citizens, only: [:index, :new, :create, :show, :edit, :update]
end
