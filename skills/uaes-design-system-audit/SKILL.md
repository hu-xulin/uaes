---
name: uaes-design-system-audit
description: Audit design-token source of truth, component contracts, accessibility, responsive behavior, and visual consistency against the project design system.
---

# UAES Design System Audit

## Purpose
Verify that UI implementation follows the approved project design system and that token/component quality gates are enforceable.

## Inputs
Project design-system specification, token source and generated artifacts, component registry, target screens, supported themes/platforms, and baseline screenshots.

## Required standards
UAES-00, UAES-05, UAES-06, UAES-07, UAES-09, UAES-10.

## Procedure
1. Identify the authoritative design-system version and token source.
2. Verify generated token artifacts are synchronized with source definitions.
3. Inspect raw color/typography/spacing/radius/elevation/motion values and distinguish token definitions from component usage.
4. Compare component variants, states, interaction behavior, keyboard access, focus, and semantic markup with component contracts.
5. Check responsive layouts, light/dark themes, contrast, reduced motion, and accessibility.
6. Run strict design lint, token sync, visual regression, and accessibility checks where available.
7. Report each violation with file/line or screenshot evidence, affected component, user impact, and correction.

## Outputs
Token sync result, component contract gaps, visual/accessibility findings, screenshots, and remediation plan.

## Permissions
READ_ONLY by default. Do not modify source tokens or generated files during an audit.

## Acceptance
Every finding is tied to a source rule and reproducible evidence; generated token definitions are not misclassified as arbitrary hard-coded component values.
