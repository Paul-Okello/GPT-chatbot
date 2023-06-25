import { NextResponse } from "next/server";
import openai from "../../../../openai";

export async function POST(request: Request) {
    const { text } = await request.json();
    
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: "As a lively and competent mental health expert, inform users with actionable insights."
            },
            {
                role: "user",
                content: `Hi, can you tell me about ${JSON.stringify(text)}?`
            }
        ]
    })

    const { data } = response
    return NextResponse.json(data.choices[0].message);
}