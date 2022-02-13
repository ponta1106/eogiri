class Title < ApplicationRecord
  has_many :replies, dependent: :destroy
end
