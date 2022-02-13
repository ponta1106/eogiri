class CreateTitles < ActiveRecord::Migration[6.0]
  def change
    create_table :titles do |t|
      t.string :user_name, null:false
      t.string :theme, null:false

      t.timestamps
    end
  end
end
