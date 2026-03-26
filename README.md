<img width="1920" height="1080" alt="Screenshot (63)" src="https://github.com/user-attachments/assets/c6c03e5d-969f-472c-9f74-828b185a7c0e" />
<img width="1920" height="1080" alt="Screenshot (64)" src="https://github.com/user-attachments/assets/eb72dd8c-7c0b-4607-a05b-9cf2db4efe4a" />
<img width="1920" height="1080" alt="Screenshot (65)" src="https://github.com/user-attachments/assets/8e517d8c-fd3c-41ce-8e71-8ca65fb9b34b" />
<img width="1920" height="1080" alt="Screenshot (66)" src="https://github.com/user-attachments/assets/9b6ffaf0-1062-4ab8-af61-cc4a45de30ef" />
<img width="1920" height="1080" alt="Screenshot (67)" src="https://github.com/user-attachments/assets/2a4451cb-bdff-49ae-b6c9-3c4927e024a0" />
<img width="1920" height="1080" alt="Screenshot (68)" src="https://github.com/user-attachments/assets/7747c8b4-95d6-4b7e-a00e-8a9e5c113ae6" />
<img width="1920" height="1080" alt="Screenshot (69)" src="https://github.com/user-attachments/assets/d8febdcb-edd8-474d-be8f-d15700909510" />
<img width="1920" height="1080" alt="Screenshot (70)" src="https://github.com/user-attachments/assets/a9084f13-8764-4c48-b28c-7fc39f1845c0" />
<img width="1920" height="1080" alt="Screenshot (71)" src="https://github.com/user-attachments/assets/f6a4fc1d-97a0-47bc-a6f0-a12ec524cb67" />
<img width="1920" height="1080" alt="Screenshot (72)" src="https://github.com/user-attachments/assets/85e86340-1492-4550-b1c2-041a7148e7fc" />
<img width="1920" height="1080" alt="Screenshot (73)" src="https://github.com/user-attachments/assets/eaa8096e-0f6c-4986-b635-ce0146eff3a6" />
<img width="1920" height="1080" alt="Screenshot (74)" src="https://github.com/user-attachments/assets/8715de73-49df-4ebc-a76e-769f9189a957" />
<img width="1920" height="1080" alt="Screenshot (75)" src="https://github.com/user-attachments/assets/8c0fced4-722a-457f-bf2b-0ac94686e612" />
No worries, bro! Here is a professional, clean, and comprehensive README.md in English. I’ve structured it so anyone can understand the setup process, from the environment variables to the one-command installation.

📝 TaskApp - Full Stack Task Management System
A robust, full-stack task management application built using the MERN stack. This project features a secure authentication system, real-time task tracking, and a modern, minimalist dark-themed UI.

🚀 Quick Start (One-Command Setup)
The project is configured with root-level scripts to handle everything at once. From the TaskApp (root) folder, run:

Install & Build: (This installs dependencies for both folders and creates the frontend production build)

Bash

npm run build
Start the Application:

Bash

npm start
⚙️ Environment Configuration
Before running the server, you must create a .env file inside the backend folder and add the following variables:

Code snippet

PORT=port
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
NODE_ENV=production
Note: Ensure your MONGODB_URI is correct, or the server will fail to start.

🛠 Manual Installation
If you prefer to set up the components individually:

1. Backend Setup
   Bash

cd backend
npm install

# Start development server

npm run dev 2. Frontend Setup
Bash

cd frontend
npm install

# Generate production build

npm run build
🏗 Project Architecture
Plaintext

TaskApp/
├── backend/ # Express & Node.js Server
│ ├── src/
│ │ ├── server.js # Entry point (Handles API & Static Files)
│ │ ├── routes/ # Auth & Task API endpoints
│ │ └── config/ # Database & Environment config
│ └── .env # Private Configuration
├── frontend/ # React.js SPA
│ ├── src/ # Components, Context, and Pages
│ ├── dist/ # Compiled production files
│ └── tailwind.config # Styling configuration
└── package.json # Root-level automation scripts
✨ Key Features
Secure Auth: JWT-based authentication with HTTP-only cookies.

Protected Routes: Only logged-in users can access the dashboard.

Task Pipeline: Full CRUD (Create, Read, Update, Delete) functionality.

Status Management: Toggle tasks between "Pending" and "Completed" with a single click.

Production Ready: Express is configured to serve the React frontend as static files.

Modern UI: Built with Tailwind CSS v4 for a high-performance, dark-mode experience.

🛠 Tech Stack
Frontend: React 18+, Tailwind CSS v4, React Router 6, Axios.

Backend: Node.js, Express.js, Path-to-Regexp.

Database: MongoDB via Mongoose.

Live link ->https://taskapp-1-004p.onrender.com/
