import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getArticles, saveArticles, getProjects, saveProjects } from '../utils/storage';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    setArticles(getArticles());
    setProjects(getProjects());
  }, []);

  // Article functions
  const addArticle = (article) => {
    const newArticle = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...article,
    };
    const updatedArticles = [...articles, newArticle];
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
    return newArticle;
  };

  const updateArticle = (id, updates) => {
    const updatedArticles = articles.map(article =>
      article.id === id ? { ...article, ...updates, updatedAt: new Date().toISOString() } : article
    );
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
  };

  const deleteArticle = (id) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
  };

  const getArticleById = (id) => {
    return articles.find(article => article.id === id);
  };

  // Project functions
  const addProject = (project) => {
    const newProject = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      likes: 0,
      ...project,
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    return newProject;
  };

  const updateProject = (id, updates) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, ...updates, updatedAt: new Date().toISOString() } : project
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const deleteProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const likeProject = (id) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, likes: project.likes + 1 } : project
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  const value = {
    articles,
    projects,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    addProject,
    updateProject,
    deleteProject,
    likeProject,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};