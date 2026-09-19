# Milabs Anniversary Website

A static anniversary website built with HTML, CSS, JavaScript, GSAP + ScrollTrigger, and Lenis.

## Structure

```text
milabs-anniversary/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── assets/
    ├── audio/
    │   └── love-is-karaoke.mp3
    └── images/
        └── milabs-center-orchid.webp
```

## Entry point

Open `index.html`.

## Notes

- GSAP, ScrollTrigger, and Lenis are loaded from CDNs.
- `?preview3` remains available for the short opening preview.
- If `styles.css` or `script.js` changes after deployment, increment the `?v=1` cache-buster in `index.html`.
