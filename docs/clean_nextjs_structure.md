# Designing a "Less Busy" Next.js Project

Next.js can feel overwhelming because it mixes configuration, routing, and UI logic in one place. Here are the best strategies to reduce the "noise" and only see the files that matter.

---

## 1. The "Clean Root" Strategy
Move everything into `src/`. This immediately hides configuration files (which you rarely touch) from your main working directory.

```text
/root
  /src
    /app    <-- Routing & Layouts
    /features <-- Feature-specific logic
    /shared  <-- Reusable UI/Lib/Hooks
  next.config.js
  package.json
  tsconfig.json
```

## 2. Feature-Based Colocation
Stop using a global `components/` or `hooks/` folder for everything. If a component is only used on one page, **keep it in that page's folder.**

### Before (Noisy/Busy)
```text
/app
  /profile
    page.tsx
/components
  ProfileHeader.tsx
  ProfileSettings.tsx
/hooks
  useProfileData.ts
```

### After (Lean/Self-Contained)
```text
/app
  /profile
    page.tsx
    _components/
      Header.tsx
      Settings.tsx
    _hooks/
      useData.ts
```
> [!TIP]
> Use the **Underscore Prefix** (`_components`). In the App Router, folders starting with an underscore are **Private Folders**. They are ignored by the router, so you can safely colocate anything there without creating new routes.

## 3. Logical Grouping with Route Groups
Use **Route Groups** (folders in parentheses) to organize your app without affecting URLs. This helps you split a large `app/` directory into logical sections.

```text
/app
  (auth)/
    login/page.tsx
    register/page.tsx
  (dashboard)/
    settings/page.tsx
    billing/page.tsx
```

## 4. Barrel Files (Use with Caution)
Use `index.ts` files to export the "public API" of a feature or folder. This allows you to import from the folder path rather than the specific file, making your imports much cleaner.

```typescript
// src/features/profile/index.ts
export * from './Header';
export * from './hooks/useData';
```
*Importing becomes:* `import { Header } from '@/features/profile';`

## 5. Configuration "Hiding" Options
*   **Move build configs:** Some tools (like Vitest or Tailwind) allow you to move their configs into a `configs/` folder, though this can sometimes be more trouble than it's worth.
*   **VS Code Settings:** You can actually "hide" specific files from your VS Code sidebar using `files.exclude`. This is the ultimate way to remove noise without moving files.

```json
// .vscode/settings.json
"files.exclude": {
  "**/.next": true,
  "**/package-lock.json": true,
  "**/next-env.d.ts": true,
  ".eslintrc.json": true
}
```

---

## The "Perfect" Clean Structure

```text
src/
  app/ (only routing/layouts)
  features/
    auth/
      _components/
      _hooks/
      index.ts
    billing/
      ...
  shared/
    ui/ (buttons, inputs)
    lib/ (clients, utils)
    hooks/ (useTheme, useWindowRef)
```

**Result:** When you work on a feature, you stay inside one directory. You are never hunting for "the header of that one page" in a giant global folder.
