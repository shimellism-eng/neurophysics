
## UI/UX Redesign Tracker

> Track every screen redesign. Mark [x] when shipped. This is a full rebuild, not a polish.
> Design context lives in .impeccable.md. Use Impeccable skills for every change.
> EVERY redesign must reference the design patterns below. If a screen doesn't feel like these apps, it's not done.

### Design References (Read Before Every Screen Redesign)

#### Steal From Duolingo:
- Home screen is a VERTICAL PATH of circular lesson nodes, not a card grid. One column. Tap the next node. That's it.
- ONE action per screen. After answering a question: one "Continue" button. Never 2-4 buttons competing.
- Progress bar is paper-thin at the top edge, no labels, no segments, no step numbers. Just a smooth fill.
- Correct/incorrect: full-screen colour wash (green/red flash) fading after 500ms, then explanation. Not a permanent banner.
- Bottom tab bar DISAPPEARS during lessons. You are IN the session. X button to exit.
- Session start: "5 questions" and a Start button. Nothing else. No settings, no filters, no badges.
- Streaks and XP are background rewards, never blocking the main flow.

#### Steal From Brilliant:
- One interactive concept per screen with ZERO chrome above it. Progress is a barely-visible thin line at the very top edge.
- Dark theme done right: very dark navy (#0D0D2B), soft white text, ONE accent colour per screen. No neon, no glow, no cyan-on-dark.
- Step-through: learner taps to advance through small visual steps. Each builds on the last. Subtle fade transitions, not page navigations.
- Generous whitespace. Content breathes. Nothing cramped.

#### Steal From Khan Academy:
- Hint system: single "Hint" button revealing one hint at a time progressively. Not all scaffolding shown at once.
- Mastery shown as a simple filled ring. One glance tells you where you are.
- Concept shown then immediately tested. No gap, no extra navigation.
- Clean empty states: simple illustration + one sentence. Not a wall of options.

#### Steal From Seneca:
- Retrieval practice loop is tight and fast: show content, test immediately, resurface errors.
- Exam board badge is tiny and subtle, not a prominent pill.

#### Anti-References (What We Must NOT Look Like):
- Any screen with coloured left-border stripes on cards (Impeccable bans this)
- Cyan-on-dark neon aesthetic (the #1 AI design tell)
- Card grids with 4+ competing coloured cards (current Home screen)
- Gradient buttons of any kind
- Screens with 3+ CTA buttons
- Truncated text anywhere
- Red deficit framing ("3 out of 10", "Very soon!", "0/6 mastered")

### Global Fixes (Apply Everywhere)

#### G1. Colour System
- [x] Kill all cyan (#00D4FF, #4AEAFF) across entire codebase
- [x] Kill all gradient buttons, replace with solid fills
- [ ] Kill all orange as primary accent, keep only as semantic warning colour
- [ ] Single accent: indigo #6366F1 for all primary actions and active states
- [ ] Tinted neutrals toward indigo hue using OKLCH
- [ ] Only 2 text colours everywhere: near-white primary + muted grey secondary
- [ ] Remove ALL coloured label text (orange, green, red section headers)
- [ ] Success green, error red, warning amber: same hex values on every screen

#### G2. Card Borders
- [x] Remove coloured left-side border accents (Impeccable ban)
- [ ] All card borders: rgba(255,255,255,0.08) everywhere
- [ ] No glowing borders, no coloured outlines
- [ ] Remove unnecessary card wrappers where spacing alone works

#### G3. Typography
- [x] Atkinson Hyperlegible for body, Bricolage Grotesque for headings
- [ ] Strict 4-5 size type scale with 1.25+ ratio between steps
- [ ] No random in-between font sizes
- [ ] Remove all coloured section header text, use white + icon/dot if needed

#### G4. Buttons
- [x] No gradient buttons anywhere
- [ ] Primary CTA: same indigo, same radius, same height, same font on every screen
- [ ] Secondary: outline style everywhere
- [ ] Tertiary: text link only

#### G5. Navigation
- [x] Remove floating ComfortFAB from all screens
- [ ] Bottom nav hidden during all lesson screens
- [ ] Bottom nav icons only, no text labels, indigo active, grey inactive
- [ ] X button exits lessons, back arrow for non-lesson navigation

### Per-Screen Redesign

#### S1. Home Screen (Duolingo-Style Rebuild)
- [x] DELETE current card grid layout entirely
- [x] Replace with Duolingo-style vertical path: circular lesson nodes in a single column, connected by a subtle dotted line
- [x] Active/next node: larger, indigo fill, pulsing gently
- [x] Completed nodes: smaller, checkmark, muted colour
- [x] Future nodes: greyed out, locked appearance
- [x] Simple greeting + name at top, no avatar, no badge, no brain icon
- [x] ONE continue card at top if mid-lesson (merge Start Here + Resume)
- [x] Quick Win: small text link below path, not a card. "Quick Win · 5 questions, 3 min"
- [x] Remove streak card entirely (opt-in via Comfort Settings only)
- [x] Remove XP card entirely (opt-in via Comfort Settings only)
- [x] Remove "0/68 topics" deficit counter
- [x] Remove ALL coloured card backgrounds (orange, teal, cyan)
- [x] Remove ALL left border stripes
- [x] No cards at all on this screen. Path nodes + text only.

#### S2. Learn Screen (Topic List)
- [x] Remove coloured borders on all topic cards
- [x] Topic identity from icon colour inside card, not border
- [x] Sub-topic names never truncated, wrap to second line
- [x] Expanded sub-topics: clean list with name + status text, no extra icons
- [x] Practice questions + Exam practice buttons restored as secondary style
- [x] Remove "1/65 mastered" or rephrase as progress bar with no number

#### S3. Lesson Header (All Lesson Screens - Brilliant Style)
- [x] Stripped to: X button + full topic name + nothing on right
- [x] Single smooth 3px progress bar, no segments
- [x] Context line: step type + "About X min left"
- [x] Total header height under 65px confirmed
- [x] No icons, no settings, no Combined button, no timers in header
- [x] "I need a break" moved to bottom of screen above CTA

#### S4. Spark Screen
- [x] Header clean (uses shared LessonHeader)
- [x] "Did you know" card: no coloured border, subtle background only
- [x] ONE primary CTA: "I'm ready"
- [x] Required Practical: secondary outline button, clearly different
- [x] Bottom nav hidden (Duolingo style: in lesson = no tab bar)

#### S5. Key Words Screen
- [x] Header clean (uses shared LessonHeader)
- [x] Word card: no dot indicators, card says "1 of 5" internally
- [x] No dual timers
- [x] Section labels in muted white, not coloured text
- [x] No coloured left borders on any cards
- [x] Bottom nav hidden

#### S6. Connect / Knowledge Check (MCQ - Duolingo Style)
- [x] Question + options + ONE button. Nothing else.
- [x] Correct: subtle green 1px border + checkmark, brief green flash like Duolingo
- [x] Incorrect: subtle red 1px border + X icon, brief red flash like Duolingo
- [x] Feedback card below with explanation
- [x] No equation chips scrolling at top
- [x] Bottom nav hidden

#### S7. Explore Screen (Brilliant Style)
- [x] Clean grid of topic items with generous whitespace
- [x] Subtle card styling, no coloured borders
- [x] ONE CTA at bottom
- [x] Break nudge: friendly, dismissible
- [x] Bottom nav hidden

#### S8. Feedback Screen
- [ ] Reframe: "You already know 3 concepts!" not "3 out of 10"
- [ ] Amber/neutral header, not red
- [ ] No nested cards (max 2 levels)
- [ ] Common Mistake vs Correct Thinking: clean cards, no coloured borders
- [ ] Real world examples: simple list, no card wrappers

#### S9. Session Complete (Duolingo Style)
- [ ] Lead with "Session complete" + encouraging one-liner
- [ ] Growth framing: "You've started your Energy journey" not "0/6 mastered"
- [ ] SRS message in subtle card (Khan Academy style mastery ring)
- [ ] ONE primary CTA: "Continue to [Next Topic]"
- [ ] ONE text link: "Back to topics"
- [ ] Remove trophy, XP, mastery counter, multiple CTAs
- [ ] Bottom nav hidden

#### S10. MamoChat
- [x] Header: Back + "Mamo" + subtitle "AI-powered physics tutor · AQA"
- [x] 4 full-text suggestions, no truncation
- [x] Sign-in card once only
- [ ] Text input bar fixed at bottom, always visible (like iMessage)
- [ ] Suggestions scroll with chat content
- [ ] Context-aware: shows current topic
- [ ] Topic-specific suggested questions
- [ ] Neurodivergent-friendly system prompt
- [ ] Bottom padding so last item not cut off

#### S11. Settings
- [x] Comfort Settings card with indigo highlight
- [x] Exam date: encouraging text, no red
- [ ] Exam board grid: subtle borders only
- [ ] Comfort Settings moved to top of page
- [ ] Streak/XP toggles inside Comfort Settings (opt-in, not default)

#### S12. Grade 9 Challenge
- [ ] No gradient start button
- [ ] Explain jargon in subtitle ("Chained calcs" etc.)
- [ ] Show estimated time
- [ ] "Question 1" not "Q1 of 33"
- [ ] Remove duplicate mark scheme hint
- [ ] Bottom nav hidden

#### S13. Comfort Settings Panel
- [x] Quick presets working
- [x] Font controls with +/- buttons
- [x] Background colour options
- [ ] Live preview strip
- [ ] Celebrations toggle (controls streak/XP/trophy visibility)
- [ ] Sound effects toggle
- [ ] Reset to defaults
