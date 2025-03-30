const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});


app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running fine 🚀' });
});


app.post('/api/tailor', async (req, res) => {
  const { resume, jobDescription } = req.body;

  const prompt = `
You are a professional resume expert. Rewrite the resume below to tailor it specifically to the following job description. Use action verbs, highlight relevant experience, and align the resume with the job requirements. Ensure the output is ATS-friendly.

Resume:
${resume}

Job Description:
${jobDescription}

Tailored Resume:
`;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const tailoredResume = chatResponse.choices[0].message.content;
    res.json({ tailoredResume });
  } catch (error) {
    console.error('OpenAI Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Error tailoring resume.' });
  }
});


app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    fs.unlink(filePath, (err) => {
      if (err) console.warn('⚠️ Could not delete file:', err);
    });

    res.json({ extractedText: pdfData.text });
  } catch (error) {
    console.error('PDF Upload/Parsing Error:', error);
    res.status(500).json({ error: 'Failed to extract text from PDF.' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
