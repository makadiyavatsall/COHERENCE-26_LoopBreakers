const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateScreeningQuestions(trialData) {
  const { trialName, disease, minAge, maxAge, inclusions, exclusions } = trialData;

  const prompt = `Based on the clinical trial information provided below, generate a maximum of 6 screening questions to determine whether a patient is eligible for the trial.

Trial Information

Trial Name: ${trialName}

Disease / Condition: ${disease}

Minimum Age: ${minAge}

Maximum Age: ${maxAge}

Inclusion Criteria: ${inclusions || 'Not specified'}

Exclusion Criteria: ${exclusions || 'Not specified'}

Instructions

Generate between 2 and 6 patient screening questions.

Questions must be derived from the inclusion and exclusion criteria.

If a criterion mentions something specific, create a question related to it.

Examples:

If inclusion says "Diagnosed with Type 2 Diabetes", create a question like
"Which type of diabetes have you been diagnosed with?"

If inclusion says "Only male patients allowed", create a question like
"What is your gender?"

If exclusion mentions alcohol, smoking, pregnancy, or medications, create questions about them.

Some questions may contain short sub-questions if needed, but keep them concise.

The questions must be simple and understandable for patients.

Along with each question, also provide the expected answer derived from the trial criteria.

Output Format

Return ONLY a valid JSON array. Each element should be an object with "question" and "expectedAnswer" fields.

Example:
[
  { "question": "What is your age?", "expectedAnswer": "Between 30 and 40 years" },
  { "question": "What is your gender?", "expectedAnswer": "Male" },
  { "question": "Which type of diabetes have you been diagnosed with?", "expectedAnswer": "Type 2 Diabetes" }
]

Return ONLY the JSON array, no extra text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a medical screening assistant. Return only valid JSON arrays.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content.trim();

    // Parse the JSON response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    throw new Error('Failed to generate screening questions from AI');
  }
}

module.exports = { generateScreeningQuestions };
