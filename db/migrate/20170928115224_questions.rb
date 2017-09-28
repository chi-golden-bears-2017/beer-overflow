class Questions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.string :body, null: false
      t.integer :user_id, null: false
      t.integer :best_answer_id
      t.timestamps
    end
  end
end
