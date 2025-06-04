# Marin Negai - Personal Portfolio

## Description

A personal portfolio website built with React and Chakra UI that allows me to showcase my projects and write articles about technology, machine learning, and software development. The site features a clean, modern design with light/dark theme support and full CRUD functionality for managing content.

## Features

### Core Functionality
- **Article Management**: Create, read, update, and delete articles written in Markdown
- **Project Showcase**: Add, edit, remove projects with technology tags and links
- **Like System**: Visitors can like projects
- **Search & Filter**: Find content by keywords, tags, or status
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works seamlessly on all device sizes

### Technical Features
- **Local Storage**: All data persists in browser storage
- **Markdown Support**: Write articles using Markdown syntax
- **Real-time Filtering**: Instant search results as you type
- **Tag System**: Organize content with tags

## Application Flow

1. **Home Page**: Overview of latest articles and projects
2. **Articles Section**: 
   - Browse all articles
   - Create new articles with Markdown editor
   - Edit existing articles
   - Filter by tags or search terms
3. **Projects Section**:
   - View all projects
   - Add new projects with details
   - Like projects
   - Filter by technology or status
4. **About Page**: Information about me and my work

## Technologies Used

- **React** - UI framework
- **Chakra UI** - Component library and styling
- **React Router** - Navigation
- **React Markdown** - Markdown rendering
- **Local Storage** - Data persistence
- **UUID** - Unique ID generation

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
```

## Deployment

The site is configured for GitHub Pages deployment:

```bash
npm run deploy
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # App layout (Header, Footer)
│   ├── Articles/       # Article-related components
│   ├── Projects/       # Project-related components
│   └── Common/         # Shared components
├── pages/              # Page components
├── contexts/           # React contexts for state
├── utils/              # Utility functions
├── theme/              # Theme configuration
└── App.js              # Main app component
```

## Author

**Marin Negai**
- GitHub: [@MarinBizarreAdventure](https://github.com/MarinBizarreAdventure)
- LinkedIn: [marinnegai](https://linkedin.com/in/marinnegai)
- Email: negaimarin@gmail.com

## License

This project is open source and available under the MIT License.