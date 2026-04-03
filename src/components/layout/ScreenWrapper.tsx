import type { ReactNode } from 'react';
import './ScreenWrapper.css';

interface ScreenWrapperProps {
  children: ReactNode;
  className?: string;
  scroll?: boolean;
}

export function ScreenWrapper({ children, className = '', scroll = true }: ScreenWrapperProps) {
  return (
    <main className={`screen-wrapper ${scroll ? 'scroll-area' : ''} ${className}`}>
      {children}
    </main>
  );
}
