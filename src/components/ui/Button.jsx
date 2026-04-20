// src/components/ui/Button.jsx
// Consistent CTA button. Min tap target 44×44px (iOS HIG).
//
// Variants: primary | secondary | ghost | danger
// Sizes:    sm (44px) | md (46px) | lg (54px)
//
// Also exports MotionButton = motion(Button) for screens that need whileTap.

import { forwardRef } from 'react'
import { motion } from 'motion/react'

const VARIANTS = {
  primary: {
    background: 'var(--np-accent)',
    color: '#07111d',
    border: '0.75px solid rgba(255,255,255,0.10)',
    boxShadow: '0 10px 22px rgba(0,0,0,0.20)',
  },
  secondary: {
    background: 'var(--surface-quiet)',
    color: 'var(--np-text)',
    border: 'var(--border-quiet)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--np-text-muted)',
    border: '0.75px solid transparent',
  },
  danger: {
    background: 'rgba(239,68,68,0.12)',
    color: 'var(--np-red)',
    border: '0.75px solid rgba(239,68,68,0.28)',
  },
};

const SIZES = {
  sm: { height: 44,  padding: '0 14px', fontSize: '0.875rem',  borderRadius: 'var(--radius-md)' },
  md: { height: 46,  padding: '0 20px', fontSize: '0.95rem',   borderRadius: 'var(--radius-lg)' },
  lg: { height: 54,  padding: '0 28px', fontSize: '1rem',      borderRadius: 'var(--radius-xl)' },
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
