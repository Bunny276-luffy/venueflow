# VenueFlow

Smart stadium coordination system to handle live wait times, gate congestion, incident tracking, and density across venues.

## Features
- **Live Metrics**: Overall attendance, wait times, open gates.
- **Gate Congestion**: Visual bar chart marking the best recommended gate dynamically.
- **Live Alerts**: Polled incident and operational alerts.
- **Map View**: Heatmap rendering of stadium limits and zone activities.
- **Responsive**: Smooth glassmorphism dark-theme layout, accessible HTML, responsive grids.

## Local Setup

### Backend (FastAPI)
1. Navigate to the `backend` folder.
2. Initialize and activate a Python virtual environment.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run tests:
   ```bash
   pytest
   ```
5. Start server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8080 --reload
   ```

### Frontend (React + Vite)
1. Navigate to the `frontend` folder.
2. Copy `.env.example` to `.env`.
3. Install packages:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation
Once the backend is running locally, view the interactive Swagger docs at: `http://localhost:8080/docs`

## Deployment
The backend API is containerized and ready to deploy via Google Cloud Run using the `cloudbuild.yaml`.
Frontend can be deployed via Vercel, Netlify, or Firebase Hosting pointing output to `dist`.

## Live Demo
[Live App URL placeholder]
