import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface UseAiChatOptions {
  context?: string;
}

function buildSystemPrompt(context: string): string {
  return `You are Alex, a patient and encouraging physics tutor. You explain things simply and clearly, using relatable everyday examples. You never use em dashes. You write in short sentences. You are especially good at helping students who find traditional teaching hard, including those with ADHD, dyslexia, or autism. When a student seems confused, try a completely different explanation approach. Current topic context: ${context}`;
}

export function useAiChat({ context = '' }: UseAiChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;

      if (!apiKey) {
        setError('Set up your API key in .env to chat with Alex');
        return;
      }

      setError(null);

      const userMessage: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: text,
      };

      setMessages(prev => [...prev, userMessage]);
      setLoading(true);

      const conversation = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 400,
            system: buildSystemPrompt(context),
            messages: conversation,
          }),
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`API error ${response.status}: ${errorBody}`);
        }

        const data = await response.json() as {
          content: Array<{ type: string; text: string }>;
        };

        const replyText =
          data.content.find(block => block.type === 'text')?.text ?? '';

        const assistantMessage: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: replyText,
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
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
