class Reply < ApplicationRecord
  belongs_to :title

  with_options presence: true do
    validates :title_id
    validates :user_name
    validates :reply_title
  end

end
