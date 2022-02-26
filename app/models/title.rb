class Title < ApplicationRecord
  has_many :replies, dependent: :destroy

  with_options presence: true do
    validates :user_name
    validates :theme
  end

end
