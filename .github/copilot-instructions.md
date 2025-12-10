---
description: AI rules derived by SpecStory from the project AI interaction history
globs: *
---

## HEADERS

## PROJECT RULES

## CODING STANDARDS

## WORKFLOW & RELEASE RULES

## TECH STACK
- Eleventy (11ty) - Recommended for generating HTML documents for both web and print.

## DEBUGGING

## PROJECT DOCUMENTATION & CONTEXT SYSTEM

## BEST PRACTICES
- When creating landing pages, prioritize a modern, responsive design. This includes:
    - Gradient backgrounds with smooth animations.
    - Card-based layouts with hover effects.
    - Mobile-responsive design.
    - High contrast for readability.
    - Emoji icons for visual appeal.
- When creating landing pages for mountain cottages, avoid generic color schemes (e.g., purple). Use more creative color palettes that reflect the natural surroundings of a mountain cottage in a national park.
- Landing pages should use the following color palette: Primary color: #3a3a3a, secondary color: #c8d5c4, other colors: #c85a3a and #b8826f, and use them in a creative way.
    - Primary color (#3a3a3a - dark gray): Used for text, headings, borders, and the main header background.
    - Secondary color (#c8d5c4 - sage green): Used for the background gradient, hover states, and borders.
    - Accent color (#c85a3a - terracotta/rust): Used for the WiFi card gradient and warning boxes.
    - Warm accent color (#b8826f - warm brown): Used as the second color in background and WiFi card gradients. The new color scheme creates a natural, earthy feel that's perfect for a mountain cottage.
- Landing pages should include the following sections where applicable:
    - Accommodation details (check-in/check-out).
    - WiFi network name and password.
    - Meal times and bar hours.
    - House rules.
    - Emergency contacts.
    - QR code for registration.
- When displaying the WiFi network name on landing pages, ensure it does not overflow its container, especially on various screen widths. To prevent overflow:
    - Use `word-break: break-word` to allow long words to break and wrap to the next line.
    - Use `overflow-wrap: break-word` to ensure text wraps to prevent overflow.
    - Use `hyphens: auto` to enable automatic hyphenation for better text breaking (on desktop).
- To minimize text duplication in HTML projects with minimal programming:
    - Use CSS variables for short, repeated text using the `content` property.
    - Store text in HTML data attributes and reference it via CSS.
    - Use HTML templates (`<template>`) for reusable HTML blocks.
    - Employ a simple JavaScript approach with variables and placeholders.
    - Utilize Emmet snippets in VS Code for frequently used HTML blocks.
    - Consider static site generators like Eleventy or Hugo for templating with data files (JSON/YAML).
- Use Libre Baskerville font for all headers and Open Sans for the body and the rest of the text.