const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildPrompt } = require("../utils/prompt_engine");

const apiKey = process.env.GEMINI_API_KEY;
// Initialize with a placeholder or handle missing key gracefully
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

async function analyzeResponses(answers) {
    if (!genAI) {
        console.warn("GEMINI_API_KEY is missing. Returning mock response.");
        return getMockResponse();
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Using gemini-2.5-flash as per available models

    const prompt = buildPrompt(answers);

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the text to ensure it's valid JSON (sometimes LLMs add markdown code blocks)
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}

function getMockResponse() {
    return {
        "extracted_traits": {
            "interests": ["Solving complex problems", "Understanding how things work"],
            "strengths": ["Mathematics", "Logical reasoning"],
            "personality": ["Introverted", "Detail-oriented"],
            "values": ["Personal interest", "Mastery"],
            "learning_style": "Conceptual & Deep Dive",
            "risk_tolerance": "Moderate",
            "work_preference": "Independent"
        },
        "top_course_matches": [
            {
                "course_name": "B.Tech in Computer Science",
                "fit_score": 92,
                "fit_label": "Very High Alignment",
                "summary": "Perfect blend of logic and creativity.",
                "detailed_reasoning": "Your answers indicate a strong preference for logic, structure, and solving complex problems ('why things work'). CS offers a canvas for this mindset. Your introverted nature aligns well with the deep focus required."
            },
            {
                "course_name": "B.Sc in Mathematics / Statistics",
                "fit_score": 85,
                "fit_label": "High Alignment",
                "summary": "Matches your strength in abstract reasoning.",
                "detailed_reasoning": "You explicitly mentioned enjoying understanding the core principles behind things. A pure science degree allows for that theoretical depth and mastery you prefer."
            }
        ],
        "courses_not_recommended": {
            "BBA / MBA (Marketing)": "You expressed a preference for working alone and solving technical problems rather than constant social interaction or managing ambiguous people-centric situations."
        },
        "alternative_paths": [
            {
                "path": "Data Science",
                "why_it_fits": "Combines math skills with coding to solve real-world problems."
            },
            {
                "path": "Research in Physics or Economics",
                "why_it_fits": "Allows for deep conceptual exploration and mastery."
            }
        ],
        "next_steps": [
            "Try a beginner coding course (like CS50 on YouTube) to see if you enjoy the process.",
            "Look at the syllabus of a CS degree vs. a Math degree to compare subjects.",
            "Talk to a senior in Engineering to ask about their daily study routine.",
            "Solve a few logic puzzles or Sudoku to test your endurance for abstract problems."
        ],
        "disclaimer": "This tool provides guidance, not a final career decision. (MOCK RESPONSE)"
    };
}

module.exports = { analyzeResponses };
