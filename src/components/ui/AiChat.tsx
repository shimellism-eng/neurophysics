import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAiChat } from '../../hooks/useAiChat';
import { TypingIndicator } from './TypingIndicator';
import './AiChat.css';

interface AiChatProps {
  context?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AiChat({ context = '', isOpen, onClose }: AiChatProps) {
  const { messages, loading, error, sendMessage } = useAiChat({ context });
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  function handleSend() {
    const text = draft.trim();
    if (!text || loading) return;
    setDraft('');
    void sendMessage(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="ai-chat__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className="ai-chat"
            role="dialog"
            aria-label="Ask Alex, AI physics tutor"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div className="ai-chat__header">
              <div className="ai-chat__avatar" aria-hidden="true">A</div>
              <div className="ai-chat__header-info">
                <span className="ai-chat__name">Alex</span>
                <span className="ai-chat__subtitle">Your physics tutor</span>
              </div>
              <button
                className="ai-chat__close"
                onClick={onClose}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat__messages" role="log" aria-live="polite" aria-label="Conversation">
              {messages.length === 0 && !loading && (
                <div className="ai-chat__empty">
                  <p className="ai-chat__empty-text">
                    Hi! I'm Alex. Ask me anything about what you're learning right now.
                  </p>
                </div>
              )}

              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`ai-chat__message ai-chat__message--${msg.role}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="ai-chat__msg-avatar" aria-hidden="true">A</div>
                  )}
                  <div className="ai-chat__bubble">
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="ai-chat__message ai-chat__message--assistant">
                  <div className="ai-chat__msg-avatar" aria-hidden="true">A</div>
                  <div className="ai-chat__bubble ai-chat__bubble--typing">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {error && (
                <div className="ai-chat__error" role="alert">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ai-chat__footer safe-bot">
              <textarea
                ref={inputRef}
                className="ai-chat__input"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Alex anything..."
                rows={1}
                aria-label="Type your question"
                disabled={loading}
              />
              <button
                className="ai-chat__send"
                onClick={handleSend}
                disabled={!draft.trim() || loading}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M18 10L2 3l4 7-4 7 16-7z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
