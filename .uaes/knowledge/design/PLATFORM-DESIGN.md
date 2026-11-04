# Uter Platform Design

**Knowledge status:** PARTIAL — repository platform folders identified; behavior parity NOT_VERIFIED.  
**Last checked:** 2026-11-05.

The inspected repository contains a web application (`web/`) and an Electron application (`electron/`). A documentation web application also exists at `docs-web/`.

## Required platform mapping

- Supported browser/OS matrix.
- Desktop window and navigation behavior.
- Electron main/renderer/preload boundaries.
- Shared design tokens and component contracts.
- Responsive breakpoints and minimum viewport.
- Platform-specific permissions, deep links, file access, and update behavior.
- Accessibility and visual regression per supported platform.

Do not claim mobile-native support unless a current native application and its build/test configuration are verified.
