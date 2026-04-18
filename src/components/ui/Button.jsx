// src/components/ui/Button.jsx
// Consistent CTA button. Min tap target 44×44px (iOS HIG).
//
// Variants: primary | secondary | ghost | danger
// Sizes:    sm (36px) | md (44px) | lg (52px)

const VARIANTS = {
  primary: {
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 16px rgba(99,102,241,0.38)',
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
  sm: { height: 36,  padding: '0 14px', fontSize: '0.875rem',  borderRadius: '10px' },
  md: { height: 44,  padding: '0 20px', fontSize: '1rem',      borderRadius: '12px' },
  lg: { height: 52,  padding: '0 28px', fontSize: '1.0625rem', borderRadius: '14px' },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  style,
  className = '',
  type = 'button',
  fullWidth = false,
}) {
  return (
    <button
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
}
