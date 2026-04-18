// src/components/ui/SafeAreaPage.jsx
// Standard full-screen page wrapper. Handles safe-area insets and background colour.
//
// Usage:
//   <SafeAreaPage hasNav>         ← adds bottom spacer for fixed BottomNav
//   <SafeAreaPage hasNav topPad>  ← also adds notch top padding (most shell screens)
//   <SafeAreaPage>                ← no nav, no extra top padding (lesson, modals)

export default function SafeAreaPage({
  children,
  hasNav = false,
  topPad = false,
  className = '',
  style,
}) {
  return (
    <div
      className={`flex flex-col h-full overflow-y-auto ${className}`}
      style={{
        background: 'var(--np-bg)',
        paddingTop: topPad ? 'var(--safe-top)' : undefined,
        ...style,
      }}
    >
      {children}

      {/* Bottom spacer: nav bar height + home indicator clearance */}
      {hasNav && (
        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            height: 'calc(var(--nav-height) + var(--safe-bottom) + 32px)',
          }}
        />
      )}
    </div>
  );
}
