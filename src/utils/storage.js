// Storage keys
const STORAGE_KEYS = {
  ARTICLES: 'portfolio_articles',
  PROJECTS: 'portfolio_projects',
  THEME: 'portfolio_theme',
};

// Get data from localStorage
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Save data to localStorage
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Remove data from localStorage
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Article storage functions
export const getArticles = () => {
  return getFromStorage(STORAGE_KEYS.ARTICLES) || [];
};

export const saveArticles = (articles) => {
  return saveToStorage(STORAGE_KEYS.ARTICLES, articles);
};

// Project storage functions
export const getProjects = () => {
  return getFromStorage(STORAGE_KEYS.PROJECTS) || [];
};

export const saveProjects = (projects) => {
  return saveToStorage(STORAGE_KEYS.PROJECTS, projects);
};

// Theme storage functions
export const getTheme = () => {
  return getFromStorage(STORAGE_KEYS.THEME) || 'light';
};

export const saveTheme = (theme) => {
  return saveToStorage(STORAGE_KEYS.THEME, theme);
};