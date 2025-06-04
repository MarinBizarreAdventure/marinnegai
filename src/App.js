import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleViewPage from './pages/ArticleView';
import ArticleEditPage from './pages/ArticleEdit';
import Projects from './pages/Projects';
import About from './pages/About';

function App() {
  return (
    <DataProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleViewPage />} />
          <Route path="/articles/edit/:id" element={<ArticleEditPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </DataProvider>
  );
}

export default App;