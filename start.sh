echo "Starting React frontend..."
PORT=3001 cd frontend-react && npm start &

echo "Starting Rails API..."
PORT=3000 cd backend-rails && rails s -p 3000
