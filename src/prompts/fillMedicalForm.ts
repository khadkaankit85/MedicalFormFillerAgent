export const formAutomationPrompt = `
You are a form filling agent. You MUST complete this task.

TASK: Fill the medical form at https://magical-medical-form.netlify.app/ with this data:
- First Name: John
- Last Name: Doe  
- Date of Birth: 1990-01-01
- Medical ID: 91927885
- Gender: Male
- Blood Type: O+
- Allergies: None
- Medications: None
- Emergency Contact Name: Jane Doe
- Emergency Contact Phone: 555-0123

INSTRUCTIONS:
1. Call navigate to go to the URL
2. Call getFormElements - you will see visibleFields array
3. Call fillInput with ALL fields from visibleFields array. Match the label to the data above.
   Example: {"selector": "#firstName", "value": "John"}
4. Call getFormElements again
5. Look at toggleButtons array. If it has items, call click on toggleButtons[0].selector
6. Call getFormElements to see new fields
7. Call fillInput with the new fields
8. Repeat steps 4-7 until you've clicked both toggle buttons
9. Call click on submitButton.selector

YOU MUST EXECUTE ALL STEPS. After each tool call, explain what you're doing next.
Start now by navigating to the form.
`;
