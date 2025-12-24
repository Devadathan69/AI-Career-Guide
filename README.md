# AI Career Guide

#The `vercel.json` file in the root handles the routing, ensuring `/api` requests go to the backend and other requests go to the React frontend.

### Local Development

1.  **Backend**: `cd backend` -> `npm install` -> `node server.js`
2.  **Frontend**: `cd frontend` -> `npm install` -> `npm run dev`

## Setup

1.  Navigate to `backend/` folder in terminal.
2.  Run `npm install`.
3.  Create a `.env` file in `backend/` and add your Gemini API Key:
      ```
      GEMINI_API_KEY=your_api_key_here
      ```
    - If you don't have a key, the system will use a Mock Response.

    ```bash
    cd client
    npm install
    npm install -D tailwindcss postcss autoprefixer
    ```

## Running the App

1.  **Start Backend**
    ```bash
    cd server
    node server.js
    ```
    (Runs on http://localhost:5000)

2.  **Start Frontend**
    ```bash
    cd client
    npm run dev
    ```
    (Runs on http://localhost:5173 usually)

3.  Open the frontend URL in your browser.

## Features
- 20 Deep Questions
- AI-Powered Analysis
- Career Suggestions with Reasoning
- Mobile Responsive
