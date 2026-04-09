const { GoogleGenerativeAI } = require('@google/generative-ai');
const { generateMockRoadmap } = require('./mockRoadmapGenerator');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const useMockFallback = (process.env.USE_MOCK_FALLBACK || 'true') === 'true';

/**
 * Clean JSON response from Gemini
 * Removes markdown code blocks and extra text
 */
const cleanJsonResponse = (text) => {
  // Remove markdown code blocks
  let cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');

  // Remove any text before the first {
  const jsonStart = cleaned.indexOf('{');
  if (jsonStart !== -1) {
    cleaned = cleaned.substring(jsonStart);
  }

  // Keep only valid JSON (remove trailing text after last })
  const jsonEnd = cleaned.lastIndexOf('}');
  if (jsonEnd !== -1) {
    cleaned = cleaned.substring(0, jsonEnd + 1);
  }

  return cleaned.trim();
};

/**
 * Generate roadmap using Gemini API with retry logic
 */
const generateRoadmapWithGemini = async (goal, skills, duration, retryCount = 0) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert career mentor.

Generate a practical and structured career roadmap.

User Details:

* Career Goal: ${goal}
* Current Skills: ${skills}
* Time Duration: ${duration}

Requirements:

* Create 5 to 7 steps
* Each step must include:
  * title
  * description
  * skills (array)
  * tools (array)
  * resources (array)
  * projectIdeas (array)

IMPORTANT:

* Return ONLY valid JSON
* Do NOT include any explanation
* Do NOT include markdown formatting
* Do NOT include any text outside the JSON

Output format:
{
  "career": "${goal}",
  "duration": "${duration}",
  "steps": [
    {
      "title": "",
      "description": "",
      "skills": [],
      "tools": [],
      "resources": [],
      "projectIdeas": []
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response
    const cleanedJson = cleanJsonResponse(text);

    // Try to parse JSON
    try {
      const parsed = JSON.parse(cleanedJson);
      return {
        success: true,
        data: parsed,
        raw: text,
        isMock: false,
        ai: {
          status: 'success',
          message: null,
        },
      };
    } catch (parseError) {
      // If parsing fails and we haven't retried yet, retry once
      if (retryCount < 1) {
        console.log('JSON parsing failed, retrying...');
        return generateRoadmapWithGemini(goal, skills, duration, retryCount + 1);
      }

      // If retry also fails, return mock if enabled, else return error
      if (useMockFallback) {
        console.log('📌 Gemini returned invalid JSON, using MOCK fallback');
        const mockData = generateMockRoadmap(goal);
        return {
          success: true,
          data: mockData,
          raw: text,
          isMock: true,
          ai: {
            status: 'error',
            message: 'Invalid AI response - could not parse JSON after retry',
          },
        };
      }

      return {
        success: false,
        message: 'Invalid AI response - could not parse JSON after retry',
        raw: text,
        cleaned: cleanedJson,
        isMock: false,
        ai: {
          status: 'error',
          message: 'Invalid AI response - could not parse JSON after retry',
        },
      };
    }
  } catch (error) {
    console.error('⚠️  Gemini API error:', error.message);
    if (useMockFallback) {
      console.log('📌 Using MOCK roadmap as fallback (development mode)');

      // Use mock data as fallback
      const mockData = generateMockRoadmap(goal);
      return {
        success: true,
        data: mockData,
        raw: 'MOCK DATA - Gemini API failed',
        isMock: true,
        ai: {
          status: 'error',
          message: error.message || 'Error communicating with Gemini API',
        },
      };
    }

    return {
      success: false,
      message: error.message || 'Error communicating with Gemini API',
      raw: null,
      isMock: false,
      ai: {
        status: 'error',
        message: error.message || 'Error communicating with Gemini API',
      },
    };
  }
};

module.exports = {
  generateRoadmapWithGemini,
  cleanJsonResponse,
};
