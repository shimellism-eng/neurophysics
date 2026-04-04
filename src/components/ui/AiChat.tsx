import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAiChat, type ImageData } from '../../hooks/useAiChat';
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
  const [pendingImage, setPendingImage] = useState<ImageData | null>(null);
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if ((!text && !pendingImage) || loading) return;
    const imageToSend = pendingImage;
    setDraft('');
    setPendingImage(null);
    setPendingImageUrl(null);
    void sendMessage(text, imageToSend);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Strip the data URL prefix to get the raw base64
      const base64 = dataUrl.split(',')[1];
      setPendingImage({ base64, mimeType: file.type || 'image/jpeg' });
      setPendingImageUrl(dataUrl);
    };
    reader.readAsDataURL(file);
    // Reset so the same file can be re-selected
    e.target.value = '';
  }

  function handleRemoveImage() {
    setPendingImage(null);
    setPendingImageUrl(null);
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
            aria-label="Ask Mamo, AI physics tutor"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div className="ai-chat__header">
              <div className="ai-chat__avatar" aria-hidden="true">M</div>
              <div className="ai-chat__header-info">
                <span className="ai-chat__name">Mamo</span>
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
                    Hi! I'm Mamo. Ask me anything about what you're learning, or send a photo of a question.
                  </p>
                </div>
              )}

              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`ai-chat__message ai-chat__message--${msg.role}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="ai-chat__msg-avatar" aria-hidden="true">M</div>
                  )}
                  <div className="ai-chat__bubble">
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="Uploaded question"
                        className="ai-chat__bubble-image"
                      />
                    )}
                    {msg.content && <span>{msg.content}</span>}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="ai-chat__message ai-chat__message--assistant">
                  <div className="ai-chat__msg-avatar" aria-hidden="true">M</div>
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

            {/* Photo preview */}
            {pendingImageUrl && (
              <div className="ai-chat__photo-preview-bar">
                <div className="ai-chat__photo-preview">
                  <img src={pendingImageUrl} alt="Photo to send" />
                  <button
                    className="ai-chat__photo-remove"
                    onClick={handleRemoveImage}
                    aria-label="Remove photo"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="ai-chat__footer safe-bot">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="ai-chat__file-input"
                onChange={handleFileChange}
                aria-label="Upload or take a photo"
              />

              <button
                className="ai-chat__photo-btn"
                onClick={handlePhotoClick}
                disabled={loading}
                aria-label="Upload or take a photo of a question"
                type="button"
              >
                📷
              </button>

              <textarea
                ref={inputRef}
                className="ai-chat__input"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Mamo anything..."
                rows={1}
                aria-label="Type your question"
                disabled={loading}
              />
              <button
                className="ai-chat__send"
                onClick={handleSend}
                disabled={(!draft.trim() && !pendingImage) || loading}
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
