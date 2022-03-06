class Api::RepliesController < ApplicationController

  def index
    @replies = Reply.all.order(created_at: :desc)
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

  def update
    @reply = Reply.find(params[:id])
    if @reply.update(reply_params)
      render json: @reply
    else
      render json: @reply.errors, status: :bad_request
    end
  end

  def destroy
    @reply = Reply.find(params[:id])
    @reply.destroy!
    render json: @reply
  end

  private

  def reply_params
    params.require(:reply).permit(:id, :created_at, :user_name, :reply_title, :favorite, :updated_at, :title_id)
  end

end
