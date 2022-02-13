class AddNullFalseToReplies < ActiveRecord::Migration[6.0]
  def change
    change_column :replies, :user_name, :string, null: false
    change_column :replies, :reply_title, :string, null: false
  end
end
