# 🚀 Quick Setup Guide

## Get Started in 3 Steps

### Step 1: Get Your Free Gemini API Key
1. Visit: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the API key (starts with `AIza...`)

### Step 2: Configure the Application
1. Open `config.js` in a text editor
2. Find this line (around line 8):
   ```javascript
   GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
   ```
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```javascript
   GEMINI_API_KEY: 'AIzaSyD...your-actual-key-here...',
   ```
4. Save the file

### Step 3: Run the Application
**Option A: Direct Browser**
- Double-click `index.html`
- Or right-click → Open with → Chrome/Firefox/Safari

**Option B: Local Server (Recommended)**
```bash
# Using Python (if installed)
python3 -m http.server 8000

# Using Node.js (if installed)
npx http-server -p 8000
```
Then open: **http://localhost:8000**

---

## 🎯 How to Use

### 1. Fill Context (Optional but Recommended)
- **Grade**: Select your class level
- **Subject**: Choose the subject
- **Classroom Type**: Pick your classroom setup
- **Issue Type**: Select the type of challenge

### 2. Ask Your Question
**Type** your question in the text area, OR
**Click 🎤** to speak your question

### 3. Get Instant Coaching
Click **"Get Coaching"** button
→ Receive personalized advice in 2-4 seconds

### 4. Provide Feedback
Click **👍 Helpful** or **👎 Not Helpful**
→ Helps improve future responses

---

## 📱 Features

✅ **Voice Input** - Speak in any of 9 Indian languages
✅ **Offline Mode** - Queries saved when offline, auto-sync when online
✅ **Smart Cache** - Instant responses for repeated questions
✅ **Multilingual** - English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Odia
✅ **Mobile-Friendly** - Works on phones, tablets, computers

---

## 💡 Example Questions

**Classroom Management:**
> "Advanced students finished early and are disrupting class. What should I do?"

**Concept Explanation:**
> "My students don't understand borrowing in subtraction with zeros. How do I explain?"

**Multi-Grade Teaching:**
> "I teach Class 3 and Class 5 together. How can I manage both during math?"

**Resource Constraints:**
> "I need to teach fractions but have no materials. What can I use?"

---

## 🔧 Troubleshooting

### "API Key Not Configured" Error
→ Make sure you replaced `YOUR_GEMINI_API_KEY_HERE` in `config.js`

### Voice Input Not Working
→ Use Chrome or Edge browser
→ Allow microphone permissions when prompted

### Slow Responses
→ Check internet connection
→ Gemini free tier has rate limits (60 requests/minute)

---

## 📊 View Analytics

Open browser console (F12) and type:
```javascript
aiService.getAnalyticsSummary()
```

See:
- Total queries submitted
- Average response time
- Language distribution
- Top issue types

---

## 🎓 For Hackathon Demo

1. **Open** `index.html` in browser
2. **Configure** API key in `config.js`
3. **Test** with Sunita's scenario:
   - Grade: Class 3-5
   - Subject: Mathematics
   - Issue: Concept Explanation
   - Query: "Students don't understand borrowing in subtraction with zeros"
4. **Show** instant, specific response
5. **Demonstrate** voice input (click 🎤)
6. **Switch** language to Hindi
7. **Show** offline mode (disconnect internet, submit query)

---

## 🌟 Key Differentiators

1. **Just-in-Time** - Instant help, not weeks later
2. **Context-Aware** - Specific to grade, subject, classroom
3. **Offline-First** - Works in low-connectivity areas
4. **Multilingual** - 9 Indian languages
5. **Voice-Enabled** - No typing needed
6. **Free to Use** - Gemini API free tier

---

**Ready to Transform Teacher Support!** 🚀
