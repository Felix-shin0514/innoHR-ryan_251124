
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_PERSONA } from "../constants";

// Initialize chat session with provided API Key and Model Name
// This allows Admin to configure the key in the UI dynamically.
export const createChatSession = (apiKey: string, modelName: string): Chat => {
  if (!apiKey) {
    throw new Error("API Key가 설정되지 않았습니다. 관리자 설정에서 키를 입력해주세요.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  return ai.chats.create({
    model: modelName,
    config: {
      systemInstruction: SYSTEM_PERSONA,
      temperature: 0.2, 
    },
  });
};

export const sendMessageStream = async (
  chat: Chat,
  message: string
): Promise<AsyncIterable<string>> => {
  try {
    const resultStream = await chat.sendMessageStream({ message });
    
    async function* streamGenerator() {
      for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    }

    return streamGenerator();
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};
