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

**npm run dev** - runs the workflow normally, fills all the fields in the form and submits it.

**npm run server** - starts an express web-server on port 3000

### How to send request to the server???

1. To run the workflow with default data, send a get req to /run-workflow endpoint.
1. To pass some custom data, send a post request to /run-workflow with available data in request body in this format:

   ```json
   {
   firstName = 'John',
   lastName = 'Doe',
   dateOfBirth = '1990-01-01',
   medicalId = '91927885',
   gender = 'male',
   bloodType = 'O+',
   allergies = 'None',
   medications = 'None',
   emergencyContact = 'Jane Doe',
   emergencyPhone = '555-0123'
   }
   ```

**npm run scheduler** - starts the scheduler which schedules the workflow for every 5 minutes

Thank you for going through this file, my portfolio website is <https://angkit.com.np>, github is <https://github.com/khadkaankit85> and leetcode is <https://leetcode.com/u/khadkaankit85/> linkedin is <https://www.linkedin.com/in/khadkaankit85/> btw.
