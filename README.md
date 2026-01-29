# Kedar Phadke - Personal Portfolio

A professional landing page showcasing my experience as an Academic Leader and Project Management Expert with 30+ years in consulting and academia.

## Live Preview

Open `index.html` in any modern web browser to view the site.

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Smooth Animations** - Scroll-triggered animations and hover effects
- **Contact Modal** - Popup form for sending messages
- **Professional Timeline** - Interactive work experience timeline
- **Clean Typography** - Google Fonts (Inter + Playfair Display)

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, animations, and responsive layout |
| JavaScript | Interactivity (modal, scroll animations, mobile menu) |
| Google Fonts | Custom typography |

No frameworks or build tools required - pure vanilla HTML, CSS, and JavaScript.

## Project Structure

```
my-first-claude-project/
├── index.html      # Main landing page
├── styles.css      # All styling (organized with comments)
├── script.js       # All JavaScript functionality
├── portfolio.html  # Original single-file version
├── todo.html       # Practice to-do app
├── CLAUDE.md       # AI assistant preferences
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## How to Open

### Option 1: Direct File Open
Simply double-click `index.html` to open it in your default browser.

### Option 2: Using a Local Server (Recommended)
For the best experience, use a local development server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using VS Code
# Install "Live Server" extension and click "Go Live"
```

Then open `http://localhost:8000` in your browser.

## Sections

1. **Hero** - Introduction with name, title, location, and key statistics
2. **About** - Professional summary and certifications
3. **Skills** - Expertise organized into four categories
4. **Experience** - Career timeline from Harvard to present
5. **Education** - Academic qualifications (PhD, MS, MBA, BSc)
6. **Contact** - Email and LinkedIn links with contact form modal

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary: #1a365d;    /* Navy blue */
    --gold: #d69e2e;       /* Gold accent */
    --accent: #3182ce;     /* Blue links */
}
```

### Content
Update the HTML in `index.html` to change text, add sections, or modify the structure.

## Future Enhancements

- [ ] Connect contact form to email service (Resend API)
- [ ] Add project portfolio section
- [ ] Add blog/articles section
- [ ] Deploy to custom domain

## Author

**Kedar Phadke, PhD**
Academic Leader | Project Management Expert
[LinkedIn](https://www.linkedin.com/in/kedarphadke) | kphadke@yahoo.com

---

*Built with assistance from Claude AI*
