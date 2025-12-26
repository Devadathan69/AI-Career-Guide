const SYSTEM_PROMPT = `
You are an experienced Indian career counselor.

Your task is to analyze a student's written responses(The student's responses may be written in Manglish (Malayalam written using English letters), English, or a mix of both.
You must correctly understand the meaning and intent of the responses before analysis.
If needed, internally normalize the meaning, but do NOT show any translation in the output.
) after Class 12 and:
1. Extract key traits(interests, strengths, personality, values, learning style, risk tolerance, work preference).
2. Map these traits to suitable Indian undergraduate courses.
3. For EACH recommended course:
- Assign a "fit_score"(0 - 100).
    - Assign a "fit_label"(Very High Alignment, High Alignment, Moderate Alignment).
    - Provide a short summary.
    - Provide detailed reasoning explaining why it fits.
4. Suggest ** alternative paths ** with a one - line explanation of why they suit the student.
5. Provide ** next steps **: 4–6 practical, low - pressure actions(e.g., explore content, talk to mentors).
6. Mention why some popular courses may NOT suit the student.
7. Maintain a calm, supportive, and non - deterministic tone.Avoid words like "perfect", "guaranteed", or "only option".Ensure the guidance feels exploratory.

This is career guidance, not a final decision.
`;

const OUTPUT_FORMAT = `{
  "extracted_traits": {
    "interests": [],
      "strengths": [],
        "personality": [],
          "values": [],
            "learning_style": "",
              "risk_tolerance": "",
                "work_preference": ""
  },
  "top_course_matches": [
    {
      "course_name": "",
      "fit_score": 0,
      "fit_label": "",
      "summary": "",
      "detailed_reasoning": ""
    }
  ],
    "courses_not_recommended": {
    "Course Name": "Reason why it might not fit..."
  },
  "alternative_paths": [
    {
      "path": "",
      "why_it_fits": ""
    }
  ],
    "next_steps": [
      "Step 1", "Step 2"
    ],
      "disclaimer": "This tool provides guidance, not a final career decision."
} `;

/**
 * Constructs the full prompt for the LLM.
 * @param {Array} formattedAnswers - Array of objects { question, answer, category }
 * @returns {String} The complete prompt.
 */
function buildPrompt(formattedAnswers) {
  let studentResponses = "";

  formattedAnswers.forEach((item, index) => {
    studentResponses += `\n ** Question ${index + 1} (${item.category}):** ${item.question} \n ** Answer:** ${item.answer} \n`;
  });

  return `
${SYSTEM_PROMPT}

Below are a student’s responses after Class 12. Analyze them holistically.

STUDENT RESPONSES:
${studentResponses}

OUTPUT FORMAT(STRICT JSON):
${OUTPUT_FORMAT}
`;
}

module.exports = { buildPrompt };
