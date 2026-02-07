# Portfolio Bilingual (EN/ES)

React + Vite single-page portfolio with English and Spanish content.

## Quick start

1. Install dependencies
2. Run the dev server

```bash
npm install
npm run dev
```

## Customize

Update copy and skills in `src/content.js`. Update contact info and structure in `src/App.jsx`.

## Deploy to GitHub Pages

This project is configured to deploy automatically with GitHub Actions.

1. Create a GitHub repository and push this project.
2. In GitHub, go to `Settings > Pages` and set `Build and deployment` source to `GitHub Actions`.
3. Push to `main` or `master`.
4. Wait for the `Deploy to GitHub Pages` workflow to finish in the `Actions` tab.
5. Your site will be available at `https://<github-user>.github.io/<repo-name>/`.

If you use another branch, adjust `.github/workflows/deploy.yml`.
