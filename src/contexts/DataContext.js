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
    const storedArticles = getArticles();
    const storedProjects = getProjects();
    
    // Initialize with sample data if empty
    if (storedArticles.length === 0) {
      const sampleArticle = {
        id: uuidv4(),
        title: 'Distributed Training for Large Language Models',
        description: 'Key insights into scaling LLM training across multiple GPUs and nodes',
        content: `# Distributed Training for Large Language Models

## Introduction

Training large language models (LLMs) has become increasingly complex as models grow from millions to billions of parameters. Distributed training is essential for making this process feasible and efficient.

## Key Insights

### 1. Data Parallelism vs Model Parallelism

**Data Parallelism**: Each GPU holds a complete copy of the model and processes different batches of data. This is effective for smaller models but becomes memory-intensive for large models.

**Model Parallelism**: The model is split across multiple GPUs, with each GPU holding only a portion. This is necessary when models are too large to fit on a single GPU.

### 2. Pipeline Parallelism

Pipeline parallelism divides the model into stages, with each stage assigned to different GPUs. This allows for:
- Better memory distribution
- Improved hardware utilization
- Reduced idle time through micro-batching

### 3. ZeRO Optimization

The Zero Redundancy Optimizer (ZeRO) is a crucial innovation that:
- Partitions optimizer states across GPUs
- Reduces memory redundancy
- Enables training of models 10x larger on the same hardware

### 4. Communication Optimization

Efficient communication between GPUs is critical:
- **All-Reduce** operations for gradient synchronization
- **NCCL** (NVIDIA Collective Communications Library) for GPU-to-GPU communication
- **Gradient compression** techniques to reduce bandwidth requirements

### 5. Mixed Precision Training

Using FP16 or BF16 instead of FP32:
- Reduces memory usage by 50%
- Speeds up computation on modern GPUs
- Requires careful handling of numerical stability

## Practical Considerations

1. **Hardware Requirements**: High-bandwidth interconnects (NVLink, InfiniBand) are crucial
2. **Batch Size Scaling**: Larger global batch sizes require learning rate adjustment
3. **Checkpointing**: Regular model checkpointing is essential for fault tolerance
4. **Load Balancing**: Ensuring even distribution of computation across GPUs

## Conclusion

Distributed training is not just about splitting work across GPUs—it's about carefully orchestrating computation, memory, and communication to achieve optimal performance. As models continue to grow, innovations in distributed training will remain critical for pushing the boundaries of AI.`,
        tags: ['Machine Learning', 'LLM', 'Distributed Systems', 'AI'],
        likes: 0,
        createdAt: new Date().toISOString()
      };
      setArticles([sampleArticle]);
      saveArticles([sampleArticle]);
    } else {
      setArticles(storedArticles);
    }
    
    if (storedProjects.length === 0) {
      const sampleProject = {
        id: uuidv4(),
        name: 'TUM Web Lab 3',
        description: 'Responsive design and animations implementation for CashAppreciated donation landing page, featuring an animated SVG mascot and mobile-optimized layouts.',
        githubUrl: 'https://github.com/MarinBizarreAdventure/tum-web-lab3',
        liveUrl: 'https://lab3.cashappreciated.com/',
        status: 'completed',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'SVG', 'Responsive Design'],
        likes: 0,
        createdAt: new Date().toISOString()
      };
      setProjects([sampleProject]);
      saveProjects([sampleProject]);
    } else {
      setProjects(storedProjects);
    }
  }, []);

  // Article functions
  const addArticle = (article) => {
    const newArticle = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      likes: 0,
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

  const likeArticle = (id) => {
    const updatedArticles = articles.map(article =>
      article.id === id ? { ...article, likes: (article.likes || 0) + 1 } : article
    );
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
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
    likeArticle,
    addProject,
    updateProject,
    deleteProject,
    likeProject,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};