class Api::TitlesController < ApplicationController
  before_action :set_title, only: [:show]

  def index
    @titles = Title.all
    render json: @titles
  end

  def show
    render json: @title
  end

  def create
    @title = Title.new(title_params)
    if @title.save
      render json: @title
    else
      render json: @title.errors, status: :bad_request
    end
  end

  private
  def set_title
    @title = Title.find(params[:id])
  end

  def title_params
    params.require(:title).permit(:user_name, :theme)
  end
end
