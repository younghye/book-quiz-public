import { Groq } from "groq-sdk";

export interface Quiz {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: string;
  isExist: boolean;
}

export interface QuizArray {
  quizs: Quiz[];
}

export const chatGroq = async (book: string, author: string) => {
  const client = new Groq({
    apiKey: process.env.REACT_APP_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const systemPrompt = `
        You are a assistant. 
        if it's yes, respond with valid JSON objects that match this structure:
        {
        "quizs": [{
            "id": number,  
            "topic": "string",
            "question": "string",
            "options": ["string"],
            "answer": "string",
            "isExist": boolean,
            }]
            Your response should ONLY contain the JSON object and nothing else.
        }`;

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `
        Generate 10 plot, story sequence and character-based questions about on "${book}" by ${author}, 
        I don't want author and theme based questions and ensure they are in JSON format containing an id,
        topic which is ${book}, a question attribute containing the question, an options array of 3 options,
        and an answer property. Please ensure that the options array is shuffled to ensure that the answer does not retain a single position.
        Can you find information of "${book}" book wrritne by "${author}" and is the author of the ${book} ${author}? if it's yes, isExist is true,if it's no, isExist is false.
        `,
      },
    ],
  });

  const responseContent = completion.choices[0].message.content;
  return JSON.parse(responseContent || "");
};
