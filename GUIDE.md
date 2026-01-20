# Medical Form Automation Agent

## Setup

Install dependencies and add your Google Gemini API key to `.env`:

```bash
npm install
```

Create `.env` file:

```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

## Commands

**npm run dev** - runs the workflow normally

**npm run server** - starts the server, on req to /formsubmit endpoint, server runs the workflow

**npm run scheduler** - starts the scheduler which schedules the workflow for every 5 minutes

Thank you for going through this file.
