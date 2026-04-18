// src/components/ui/Button.jsx
// Consistent CTA button. Min tap target 44×44px (iOS HIG).
//
// Variants: primary | secondary | ghost | danger
// Sizes:    sm (36px) | md (44px) | lg (52px)
//
// Also exports MotionButton = motion(Button) for screens that need whileTap.

import { forwardRef } from 'react'
import { motion } from 'motion/react'

const VARIANTS = {
  primary: {
    background: 'linear-gradient(135deg, var(--np-indigo), #4f46e5)',
    color: '#fff',
    border: 'none',
    boxShadow: 'var(--shadow-raised)',
  },
  secondary: {
    background: 'rgba(99,102,241,0.12)',
    color: 'var(--np-indigo)',
    border: '0.75px solid rgba(99,102,241,0.28)',
  },
  ghost: {
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--np-text)',
    border: '0.75px solid var(--np-border)',
  },
  danger: {
    background: 'rgba(239,68,68,0.12)',
    color: 'var(--np-red)',
    border: '0.75px solid rgba(239,68,68,0.28)',
  },
};

const SIZES = {
  sm: { height: 36,  padding: '0 14px', fontSize: '0.875rem',  borderRadius: 'var(--radius-sm)' },
  md: { height: 44,  padding: '0 20px', fontSize: '1rem',      borderRadius: 'var(--radius-md)' },
  lg: { height: 52,  padding: '0 28px', fontSize: '1.0625rem', borderRadius: 'var(--radius-lg)' },
};

const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  style,
  className = '',
  type = 'button',
  fullWidth = false,
}, ref) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'font-semibold flex items-center justify-center gap-2',
        'transition-opacity select-none',
        disabled ? 'opacity-40 cursor-not-allowed' : 'active:opacity-75',
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      style={{
        fontFamily: 'var(--font-display)',
        ...VARIANTS[variant],
        ...SIZES[size],
        ...style,
      }}
    >
      {children}
    </button>
  );
});

export default Button;

/** Motion-enhanced Button — supports whileTap, whileHover, animate etc. */
export const MotionButton = motion(Button);
