# 🌐 AI-Powered Accessibility Auditor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/accessibility-auditor/pulls)
[![Vue.js](https://img.shields.io/badge/Framework-Vue.js-4FC08D.svg)](https://vuejs.org/)
[![WCAG 2.2](https://img.shields.io/badge/Compliance-WCAG_2.2-005A9C.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

An intelligent browser extension that automatically scans web pages for accessibility issues, provides AI-generated fixes, and visualizes compliance gaps in real-time. Stand out in job applications by showcasing this unique project that combines cutting-edge AI with critical web accessibility needs.




## ✨ Key Features

- **Real-Time Page Scanner**  
  Instant WCAG 2.2 compliance checks on live websites
- **AI-Powered Fix Assistant**  
  GPT-4 generated solutions with code snippets
- **Visual Overlay System**  
  Interactive error highlighting directly on web pages
- **Compliance Heatmaps**  
  Visualize accessibility debt across entire sites
- **One-Click Patches**  
  Apply AI-suggested fixes directly in DevTools
- **Figma Plugin Integration**  
  Catch issues during design phase

## 🛠️ Tech Stack

**Core**  
![Vue.js](https://img.shields.io/badge/-Vue.js-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![WebExtensions API](https://img.shields.io/badge/-WebExtensions-4285F4?logo=google-chrome&logoColor=white)

**AI & Services**  
![OpenAI GPT-4](https://img.shields.io/badge/-GPT--4-412991?logo=openai&logoColor=white)
![Axe-Core](https://img.shields.io/badge/-Axe--Core-F04E23?logo=accessibility&logoColor=white)
![WebSockets](https://img.shields.io/badge/-WebSockets-010101?logo=socket.io&logoColor=white)

**Visualization**  
![D3.js](https://img.shields.io/badge/-D3.js-F9A03C?logo=d3.js&logoColor=white)
![Figma Plugin API](https://img.shields.io/badge/-Figma_Plugin-0ACF83?logo=figma&logoColor=white)

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/debjit018/ai-accessibility-auditor.git

# Install dependencies
npm install

# Build extension for development
npm run build:dev

# Load extension in browser:
# 1. Open Chrome/Edge → Extensions → Manage Extensions
# 2. Enable "Developer mode"
# 3. Click "Load unpacked" and select /dist folder
```

## 🎮 Usage

1. Click extension icon while browsing any website
2. View real-time accessibility score in popup
3. Toggle visual overlay to see issue highlights
4. Open DevTools (Ctrl+Shift+I) to access:
   - AI-generated fix suggestions
   - Compliance heatmaps
   - One-click patch application
   - PDF report generation

## 📚 Documentation

| Component         | Description                          |
|-------------------|--------------------------------------|
| [Architecture](docs/ARCHITECTURE.md) | System design and data flow |
| [AI Integration](docs/AI_INTEGRATION.md) | GPT-4 prompt engineering |
| [Browser Extension](docs/EXTENSION_GUIDE.md) | API usage patterns |
| [Figma Plugin](docs/FIGMA_PLUGIN.md) | Design-time auditing |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request



## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Project Link: [https://github.com/debjit018/ai-accessibility-auditor](https://github.com/debjit018/ai-accessibility-auditor)
