# Geinel's Portfolio - (Demo)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

A retro-themed, fully functional web portfolio built entirely with **Vanilla Web Technologies** (HTML, CSS, JS). 

This repository is a specialized "Demo" version of the original Next.js portfolio, completely refactored into a framework-free environment. It was designed specifically to be beginner-friendly and to meet the prerequisites for demonstrating static site deployment on **Google Cloud Platform (GCP)**.

## Features

- **Nostalgic UI**: Pixel-perfect Windows 97 aesthetic with classic gray windows, 3D borders, and teal desktop.
- **Interactive Start Menu**: Fully functional Start Menu with categorized navigation and external social links.
- **Dynamic Taskbar**: Real-time clock and date widget on the bottom right.
- **Project Modals**: Custom-built pop-up modals for projects, featuring image carousels, tech stack badges, and descriptions.
- **Zero Dependencies**: No React, no Tailwind, no npm build steps. Runs directly in any modern web browser.
- **Responsive**: Adapts gracefully to different screen sizes.

## Tech Stack

This project strictly adheres to a beginner-friendly stack:
- **HTML5**: For semantic structure and content data.
- **CSS3**: For styling, layout, and pure CSS keyframe animations (replacing Framer Motion).
- **Vanilla JavaScript**: For DOM manipulation, modal logic, and state handling (replacing React Hooks).

## File Structure

The entire application is contained within just three core files:

```text
portfolio
 ┣ index.html       # Main document containing layout, SVG icons, and project data
 ┣ style.css        # All styling rules and Windows 97 design tokens
 ┣ script.js        # Interactivity (Clock, Start Menu, Tabs, Modals)
 ┣ images/          # (Add your static image assets here)
 ┗ README.md        # You are here
```

## How to Run Locally

Because this project relies on zero build tools, running it is incredibly simple:

1. Clone or download this repository to your local machine.
2. Navigate to the `portfolio` directory.
3. Double-click the `index.html` file to open it in your default web browser.

*Note: Ensure your image assets (e.g., `photo-portfolio2.png`) are placed in the same directory or adjust the relative paths in the HTML accordingly.*

## Deployment (Google Cloud Platform)

This project is perfectly tailored for static hosting on GCP using Cloud Storage:

1. Go to the **Google Cloud Console**.
2. Create a new **Cloud Storage Bucket** (ensure public access is enabled).
3. Upload `index.html`, `style.css`, `script.js`, and any image assets directly into the bucket.
4. Set the `MainPageSuffix` to `index.html` in the bucket's static website configuration.
5. Your retro portfolio is now live!

## Author

**Geinel Niño A. Dungao**  
*IT Student | Full-Stack Web & IoT Developer*  
- [GitHub](https://github.com/wolfsenberg)
- [LinkedIn](https://www.linkedin.com/in/geineldungao/)
