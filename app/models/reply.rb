class Reply < ApplicationRecord
  belongs_to :title

  with_options presence: true do
    validates :title_id
    validates :user_name
    validates :reply_title
    validates :favorite
  end

  has_one_attached :image

  def image_url
    image.attached? ? Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true) : nil
  end
end
