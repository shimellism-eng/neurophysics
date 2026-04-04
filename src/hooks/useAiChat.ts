import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string; // data URL for display in bubbles
}

export interface ImageData {
  base64: string;
  mimeType: string;
}

interface UseAiChatOptions {
  context?: string;
}

function buildSystemPrompt(context: string): string {
  return `You are Mamo, a patient and encouraging GCSE Physics teacher. You teach physics in a way that works for every brain type including students with ADHD, dyslexia and autism. You use short sentences. You explain with everyday examples. You never use dashes in the middle of sentences. You do not use jargon without explaining it first. When a student sends you a photo of a physics question, read it carefully and walk through the answer step by step. You can answer ANY physics question, not just GCSE level. Always be warm and encouraging. Current topic: ${context}`;
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent`;

interface GeminiPart {
  text?: string;
  inlineData?: { mimeType: string; data: string };
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

interface GeminiResponse {
  candidates: Array<{
    content: { parts: Array<{ text: string }> };
  }>;
}

export function useAiChat({ context = '' }: UseAiChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string, imageData: ImageData | null = null) => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

      if (!apiKey) {
        setError('Set up your Gemini API key in .env to chat with Mamo');
        return;
      }

      setError(null);

      const imageUrl = imageData
        ? `data:${imageData.mimeType};base64,${imageData.base64}`
        : undefined;

      const userMessage: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: text,
        imageUrl,
      };

      setMessages(prev => [...prev, userMessage]);
      setLoading(true);

      // Build Gemini contents array from full history including the new message
      const allMessages = [...messages, userMessage];

      let contents: GeminiContent[];

      if (imageData) {
        // Multimodal request: send the current message with the image, plus prior history
        const priorHistory: GeminiContent[] = allMessages.slice(0, -1).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const imageParts: GeminiPart[] = [
          { text: text || 'Please explain this physics question.' },
          { inlineData: { mimeType: imageData.mimeType, data: imageData.base64 } },
        ];

        contents = [
          ...priorHistory,
          { role: 'user', parts: imageParts },
        ];
      } else {
        contents = allMessages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));
      }

      const body = {
        systemInstruction: { parts: [{ text: buildSystemPrompt(context) }] },
        contents,
        generationConfig: {
          maxOutputTokens: imageData ? 600 : 500,
          temperature: imageData ? 0.7 : 0.8,
        },
      };

      try {
        const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`API error ${response.status}: ${errorBody}`);
        }

        const data = (await response.json()) as GeminiResponse;
        const replyText = data.candidates[0]?.content?.parts[0]?.text ?? '';

        const assistantMessage: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: replyText,
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong. Please try again.';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [messages, context],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, loading, error, sendMessage, clearMessages };
}
