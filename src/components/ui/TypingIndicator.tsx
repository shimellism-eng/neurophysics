import './TypingIndicator.css';

export function TypingIndicator() {
  return (
    <div className="typing-indicator" aria-label="Alex is thinking" role="status">
      <span className="typing-indicator__dot" />
      <span className="typing-indicator__dot" />
      <span className="typing-indicator__dot" />
    </div>
  );
}
