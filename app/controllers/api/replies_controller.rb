class Api::RepliesController < ApplicationController
  before_action :set_title

  def index
    @replies = Reply.where(title_id: @title)
    render json: @replies
  end

  def create
    @reply = Reply.new(reply_params)
    if @reply.save
      render json: @reply
    else
      render json: @reply.errors, status: :bad_request
    end
  end

  private

  def set_title
    @title = Title.find(params[:title_id])
  end

  def reply_params
    params.require(:reply).permit(:title_id, :user_name, :reply_title, :favorite)
  end

end
