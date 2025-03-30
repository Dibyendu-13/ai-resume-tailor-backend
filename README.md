
# 📄 AI Resume Tailoring Service

This is a Node.js + Express backend that allows users to upload a resume (PDF), extract its content, and tailor it automatically to a specific job description using OpenAI's GPT-4.

## 🔧 Features

- Upload PDF resumes and extract text
- Automatically tailor resumes to job descriptions using OpenAI
- Health check endpoint for easy server validation

## 🚀 Tech Stack

- Node.js
- Express
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- OpenAI GPT-4 API
- dotenv (environment variables)
- CORS & Body Parser middleware

## 📁 Project Structure

```
├── uploads/              # Temporary folder for uploaded PDFs
├── .env                  # Environment variables (you must create this)
├── server.js             # Main Express app
└── README.md             # You're here!

```

## 🔐 Environment Variables

Create a `.env` file in the root directory and add:

OPENAI_API_KEY=your_openai_api_key_here
PORT=5001

## 📦 Installation


git clone https://github.com/Dibyendu-13/ai-tailored-resume.git
cd ai-tailored-resume
npm install

## ▶️ Running the Server

npm start

Your server will be running on:  
http://localhost:5001

## 📡 API Endpoints

### 1. Health Check

- **GET** `/api/health`
- ✅ Returns: `{ status: "Server is running fine 🚀" }`

---

### 2. Upload Resume PDF

- **POST** `/api/upload`
- 📤 `multipart/form-data` with key: `pdf`
- 📄 Returns extracted resume text

**Response:**

{
  "extractedText": "Extracted content from your PDF resume..."
}

---

### 3. Tailor Resume

- **POST** `/api/tailor`
- **Body:**

{
  "resume": "Plain text of the resume",
  "jobDescription": "Plain text of the job description"
}

**Response:**

{
  "tailoredResume": "Rewritten, ATS-friendly resume tailored to the job description"
}

---

## ⚠️ File Limitations

- Only PDF files allowed
- Max file size: 5MB
- Uploaded files are deleted after processing

## 📬 License

MIT License — feel free to use and modify!

---

Happy Tailoring! ✨
