class Api::RepliesController < ApplicationController

  def index
    @replies = Reply.all.order(created_at: :desc)
    render json: @replies, methods: [:image_url]
  end

  def create
    @reply = Reply.new(reply_params)
    if @reply.save
      render json: @reply, methods: [:image_url]
    else
      render json: @reply.errors, status: :bad_request
    end
  end

  def update
    @reply = Reply.find(params[:id])
    if @reply.update(reply_params)
      render json: @reply, methods: [:image_url]
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
    params.permit(:user_name, :title_id, :reply_title, :favorite, :image)
  end

end
