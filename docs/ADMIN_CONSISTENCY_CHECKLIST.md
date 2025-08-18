# Admin Consistency Checklist

- Tokens and Spacing
  - [x] Spacing uses 4/8px rhythm (Tailwind `p-2`, `p-4`, `gap-2`, `gap-4`)
  - [x] Radii consistent (rounded-lg for cards, rounded-md for pills)
  - [x] Shadows consistent (`shadow-sm` for chips, `shadow` for cards)

- Typography
  - [x] Headings consistent (`text-3xl` page headers, `text-xl` card headers)
  - [x] Body text readable (>= `text-sm` with adequate contrast)

- Buttons
  - [x] Primary: solid gold (`bg-gold-500 hover:bg-gold-600`)
  - [x] Secondary: outline (`variant="outline"`)
  - [x] Subtle: ghost (`variant="ghost"`)
  - [x] Focus ring visible (`focus-visible:ring-2`)

- Inputs
  - [x] Consistent border, padding, and focus state (`focus:ring-gold-500`)
  - [x] Labels present; helpful text for complex inputs

- Tables
  - [x] Header weight, cell padding, hover row consistent
  - [x] Zebra optional but disabled for now

- Cards/Drawers/Modals
  - [x] Same radii, shadow, padding
  - [x] Close affordances consistent

- Messages
  - [x] Uniform success/info/warn/error styles
  - [x] No raw stack traces to users

- Accessibility
  - [x] Keyboard navigable; visible focus
  - [x] Sufficient contrast (AA); dynamic text color on color chips

- Navigation
  - [x] Sidebar active state accurate
  - [x] Sticky header only in layout; content scrolls under

- Media
  - [x] Image upload previews present with remove affordance

Add checks as features expand (orders, customers, etc.).
