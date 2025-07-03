DevDiary – A Weekly Developer Reflection Journal

📆 Track your progress, reflect on challenges, and set weekly goals with DevDiary – a minimalist journal for developers.

🚀 Features
✅ Weekly Entries (What did you learn? Struggles? Goals?)
📅 Timeline View (Browse past entries chronologically)
✍️ Markdown Support (Format text with headings, lists, code blocks)
🔒 Secure Authentication (JWT-based login)
🌙 Dark/Light Mode (Easy on the eyes)

🛠 Tech Stack
Frontend React	
Backend	Node.js
Database MongoDB

📥 Installation
1. Clone the Repository
git clone https://github.com/SachiniPinnaduwa/devdiary.git
cd devdiary

2. Set Up Backend
cd server
npm install
touch .env  # Add MongoDB URI & JWT_SECRET
node server.js

3. Set Up Frontend
cd ../client
npm install
npm start

🔧 Environment Variables
Create .env in server/:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
PORT=5000

📂 Project Structure
devdiary/  
├── client/          # React frontend  
│   ├── public/  
│   └── src/         # Components, pages, styles  
├── server/          # Node.js backend  
│   ├── models/      # MongoDB schemas  
│   ├── routes/      # API endpoints  
│   └── server.js    # Entry point  
└── README.md  

🎯 Roadmap
Phase 1: Project Setup (MERN)
Phase 2: User Authentication (JWT)
Phase 3: Diary Entry CRUD
Phase 4: Timeline & Markdown Rendering

Happy Coding! ✨
Let’s build a habit of reflection and growth. 🚀
		
