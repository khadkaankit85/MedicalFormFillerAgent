export interface WorkflowData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  medicalId: string;
  gender: string;
  bloodType: string;
  allergies: string;
  medications: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export const getPrompt = (data?: Partial<WorkflowData>): string => {
  const {
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
  } = data || {};

  return `
You are a form filling agent. You MUST complete this task.

TASK: Fill the medical form at https://magical-medical-form.netlify.app/ with this data:
- First Name: ${firstName}
- Last Name: ${lastName}
- Date of Birth: ${dateOfBirth}
- Medical ID: ${medicalId}
- Gender: ${gender}
- Blood Type: ${bloodType}
- Allergies: ${allergies}
- Medications: ${medications}
- Emergency Contact Name: ${emergencyContact}
- Emergency Contact Phone: ${emergencyPhone}

INSTRUCTIONS:
1. Call navigate to go to the URL
2. Call getFormElements - you will see visibleFields array
3. Call fillInput with ALL fields from visibleFields array. Match the label to the data above.
   Example: {"selector": "#firstName", "value": "${firstName}"}
4. Call getFormElements again
5. Look at toggleButtons array. If it has items, call click on toggleButtons[0].selector
6. Call getFormElements to see new fields
7. Call fillInput with the new fields
8. Repeat steps 4-7 until you've clicked both toggle buttons
9. Call click on submitButton.selector

YOU MUST EXECUTE ALL STEPS keeping the api calls minimal. After each tool call, explain what you're doing next.
Start now by navigating to the form.
`;
};
