echo "Starting React frontend..."
PORT=3001 cd frontend-react && npm install && npm start &

echo "Creating Devise JWT Secret Key..."
cd ./backend-rails
bundle
SECRET=$(bundle exec rake secret)
echo "DEVISE_JWT_SECRET_KEY=$SECRET" > .env

echo "Starting Rails API..."
PORT=3000 rails db:create db:migrate && rails s -p 3000
