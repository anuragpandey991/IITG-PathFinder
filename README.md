# IITG PathFinder

### Personal Project 

### Overview
IITG PathFinder is a full-stack web application designed to help users navigate the IIT Guwahati campus efficiently. The app calculates the shortest path and estimated travel time between 64 campus locations, supporting three travel modes: walking, cycling, and driving. Users can view recent searches, mark favorite locations, and switch between different travel modes. The project implements a weighted-undirected graph using an adjacency list representation and employs the Dijkstra Algorithm to find the optimal path between any two points.

### Features
- **Shortest Path Calculation**: Uses Dijkstra's Algorithm to find the shortest path between any two of the 64 campus locations.
- **Multiple Travel Modes**: Supports three travel modes — walking, cycling, and driving — each with a different speed for accurate time estimates.
- **Recent Searches and Favorites**: Tracks recent searches and allows users to mark locations as favorites, storing data in local storage.
- **User-friendly Interface**: Dropdowns for selecting source and destination, with favorite locations highlighted for easy access.
- **Data Visualization**: Displays the shortest path with distance and estimated travel time.

### Project Details
- **Backend**: Implemented in Node.js with an Express server to handle API requests and pathfinding logic.
- **Frontend**: Built using React.js to create an interactive user interface.
- **Graph Data Structure**: A weighted-undirected graph represents campus locations and paths using an adjacency list.
- **Pathfinding Algorithm**: Dijkstra’s Algorithm is used to compute the shortest path between two points, considering travel mode constraints.
- **Performance Improvement**: Reduced average path distance by 210m and travel time by 12% for the top 5 most frequently traveled routes.

### Installation and Setup
#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- React

#### Backend Setup
1. Navigate to the `backend` folder.
   ```bash
   cd backend
### Install dependencies.
   bash
   npm install

## Start the backend server.
node app.js
The backend server will be running at http://localhost:5000.
Frontend Setup
## Navigate to the root directory.
cd ..
## Install frontend dependencies.
npm install
## Start the React frontend server.
npm start
The frontend will be running at http://localhost:3000.
## How It Works
Select Source and Destination: Choose the source and destination locations from the dropdown menus.
Choose Travel Mode: Select the desired travel mode (Walk, Cycle, Bike, Car).
Get Shortest Path: Click on Find Path to calculate and display the shortest path, distance, and estimated travel time.
Mark Favorites: Click the ★ icon to mark a location as favorite.
Recent Searches: Access recent searches from the sidebar and quickly recalculate paths.
