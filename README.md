# Abdelrahman Browser

A lightweight, custom desktop web browser built with **Electron**, HTML, CSS, and JavaScript. Designed for fast browsing and seamless access to the **Abdelrahman HomeLab** ecosystem.

🌐 **Official HomeLab Dashboard:** [https://dpdns.org](https://abdelrahmanhomelabs.dpdns.org)

---

## Features

- **Custom Desktop Experience:** Built on Electron with a clean, responsive interface (`index.html` & `renderer.js`).
- **Built-in Settings:** Customize browser behavior and preferences directly from the dedicated settings view (`settings.html`).
- **Windows Installer:** Includes a ready-to-run Windows installer (`Abdelrahman Browser Web Setup 1.0.0.exe`).
- **HomeLab Ecosystem Ready:** Built to work alongside self-hosted tools on [Abdelrahman HomeLab](https://abdelrahmanhomelabs.dpdns.org), including HomeLab AI, HomeLab Drive, HomeLab Studio, and HomeLab IDE.

---

## Project Structure

```text
my-browser/
├── Abdelrahman Browser Web Setup 1.0.0.exe   # Windows installer
├── index.html                                # Main browser UI
├── settings.html                             # Browser settings page
├── main.js                                   # Electron main process
├── renderer.js                               # Frontend browser logic
├── package.json                              # Project metadata & dependencies
└── README.md                                 # Project documentation
```

---

## Running from Source

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd my-browser
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the browser:**
   ```bash
   npm start
   ```

---

## Author

Built by **Abdelrahman Ziad Mahmoud Rady**  
Explore more self-hosted projects and tools at **[abdelrahmanhomelabs.dpdns.org](https://abdelrahmanhomelabs.dpdns.org)**.
