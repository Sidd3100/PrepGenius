const questionAnswerPrompt = (role,experience, topicsToFocus, numberOfQuestions) => 
    `You are an AI trained to generate interview questions and answers.
    Task:
    -Role: ${role}
    -Candidate Experience: ${experience} years
    -Focus Topics: ${topicsToFocus}
    -Write ${numberOfQuestions} interview questions.
    -For each question, generate a detailed but beginner -friendly answer.
    -If the anser needs  a code example, provid a small code block inside.
    -Keep formatting simple and clear.
    -Return a pure JSON array like:
    [{
        "question": "Question text here",
        "answer": "Answer text here"

    },
    ...
    ]
    Important:
    -Do not include any additional text or explanations.Only return valid JSON.

    `;

    const conceptExplanationPrompt = (question) =>`
        You are an AI trained to generate explanations for a given interview question.
        Task:
        -Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
        -Question: ${question}
        -After the explaanation, provide a short and clear title that summarizes the concept for the article or page header.
        -If the explanation includes a code example, provide a small code block inside.
        -Keep formatting simple and clear.
        -Return a pure JSON object like:
        {
            "title": "Title text here",
            "explanation": "Explanation text here"
            
        }
            
        Important:
        -Do not include any additional text or explanations. Only return valid JSON.
        `;

        module.exports = {
            questionAnswerPrompt,
            conceptExplanationPrompt
        };