
import { GoogleGenAI, Type } from "@google/genai";
import { MentorMessage } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // API key must be obtained exclusively from process.env.API_KEY and used directly
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getCodeExplanation(code: string, concept: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a beginner C++ student. Please explain the following C++ code snippet and the concept of "${concept}" in simple terms.
        
        CODE:
        ${code}
        
        Focus on:
        1. How it works line-by-line.
        2. Why we use ${concept}.
        3. A tip for a first-year student.`,
        config: {
            temperature: 0.7,
            topP: 0.95,
        }
      });
      // Use .text property directly, do not call as a method
      return response.text || "I'm sorry, I couldn't process that explanation right now.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while communicating with the AI mentor.";
    }
  }

  async chatWithMentor(history: MentorMessage[], userInput: string): Promise<string> {
    try {
      const chat = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are a friendly, encouraging C++ professor for first-year undergraduate students. Keep explanations clear, use relatable analogies, and occasionally provide short code examples in your responses. You are helping them build a portfolio.",
        }
      });

      // sendMessage only accepts the message parameter
      const response = await chat.sendMessage({ 
          message: userInput
      });
      
      // Use .text property directly, do not call as a method
      return response.text || "I'm having trouble thinking right now. Let's try again later!";
    } catch (error) {
      console.error("Chat Error:", error);
      return "Oops! My AI circuits are a bit fuzzy. Please check your connection.";
    }
  }
}

export const gemini = new GeminiService();
