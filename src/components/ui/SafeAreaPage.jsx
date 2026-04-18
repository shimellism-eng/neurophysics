// src/components/ui/SafeAreaPage.jsx
// Standard full-screen page wrapper.
//
// NOTE: App.jsx already reserves env(safe-area-inset-top) via a spacer div before
// the router renders. Screens must NOT add their own safe-area-inset-top — it would
// be counted twice. topPad prop is kept for backwards compat but now just adds 16px
// breathing room (no safe-area variable).
//
// Usage:
//   <SafeAreaPage hasNav>      ← adds bottom spacer for fixed BottomNav
//   <SafeAreaPage hasNav topPad> ← also adds 16px breathing room below the notch spacer
//   <SafeAreaPage>             ← no nav, no extra top padding

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
        paddingTop: topPad ? '16px' : undefined,
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
