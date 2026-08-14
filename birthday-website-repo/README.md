# 🎉 Interactive Birthday Celebration Website

A modern, responsive, and interactive birthday website draft built with vanilla HTML5, CSS3, and JavaScript. Zero external build tools or framework dependencies needed — simply open `index.html` in any browser or deploy to GitHub Pages, Netlify, or Vercel.

---

## ✨ Features

- 🎊 **Dynamic Confetti Explosion**: Built-in, high-performance HTML5 Canvas confetti engine (no external CDN required).
- 🎂 **Interactive Cake & Candle**: Click the birthday candle to blow out the flame and make a wish, accompanied by celebratory sounds and confetti.
- 🎁 **Surprise Gift Box**: Click the 3D-styled gift box to unwrap and reveal a personalized birthday card note.
- 📸 **Memories & Highlights Gallery**: Showcase memorable moments, favorite adventures, and heartfelt photos.
- 💌 **Interactive Guestbook & Wishes Wall**: Visitors can write customized birthday messages with selectable card colors (persisted locally via `localStorage`).
- ✏️ **Live Customizer & Quick Config**: Easily edit the recipient's name, message, and date via `js/config.js` or through the on-page "Customize Preview" modal.
- 📱 **Fully Responsive**: Optimized for smooth viewing on mobile phones, tablets, and desktops.

---

## 📁 Project Structure

```text
birthday-website/
├── index.html            # Main website structure & interactive modals
├── css/
│   └── styles.css        # Responsive layout, animations, and pastel glassmorphic theme
├── js/
│   ├── config.js         # Centralized configuration (recipient name, messages, memories)
│   ├── confetti.js       # Offline vanilla JS confetti animation engine
│   └── app.js            # App logic, interactive sound synthesizer, guestbook, and modals
├── assets/
│   └── images/           # Folder for custom birthday photos and assets
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation and deployment guide
```

---

## 🚀 How to Run Locally

1. **Directly in Browser**:
   Double click `index.html` or open it in Google Chrome, Safari, Firefox, or Edge.

2. **Using a Local Server (Optional)**:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your web browser.

---

## ⚙️ How to Personalize

Open `js/config.js` in any text editor and edit the following fields:

```javascript
const BIRTHDAY_CONFIG = {
  recipientName: "Sam",           // Name of the birthday person
  heroTitle: "Happy Birthday! 🎉", 
  heroSubtitle: "Wishing you an unforgettable year filled with joy!",
  
  // Custom message revealed when the gift box is clicked
  giftBoxMessage: {
    title: "A Special Birthday Message 🎁",
    body: "Your personal message here...",
    signature: "With love ❤️"
  },

  // Add or update memories in the gallery
  memories: [
    {
      title: "Trip to the Mountains",
      caption: "That weekend road trip we'll never forget.",
      tag: "Adventures",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }
  ]
};
```

---

## 🌐 Deployment Guide

### Deploying to GitHub Pages
1. Push this repository to GitHub.
2. Navigate to repository **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live within seconds at `https://<username>.github.io/<repo-name>/`.

### Deploying to Vercel or Netlify
- Drag and drop the `birthday-website` folder directly onto [Netlify Drop](https://app.netlify.com/drop) or import the GitHub repository into [Vercel](https://vercel.com).
