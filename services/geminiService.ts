import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
      console.error("API_KEY not found in environment");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const startChat = async (history: { role: string; parts: { text: string }[] }[] = []) => {
  const ai = getGenAI();
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are a helpful, witty, and concise AI assistant running inside a web-based Windows 11 simulation. Keep answers brief and helpful.",
    },
    history: history as any,
  });
  return chatSession;
};

export const sendMessageStream = async (message: string, onChunk: (text: string) => void) => {
  if (!chatSession) {
    await startChat();
  }

  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of result) {
        // Correct way to access text from chunk based on updated SDK guidance
        const text = chunk.text; 
        if (text) {
            onChunk(text);
        }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    onChunk("\n[Error: Unable to connect to AI service. Please check your API Key.]");
  }
};
