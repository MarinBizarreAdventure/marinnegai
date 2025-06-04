import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useData } from '../contexts/DataContext';
import ArticleForm from '../components/Articles/ArticleForm';

const ArticleEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArticleById, updateArticle } = useData();
  const article = getArticleById(id);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const handleSubmit = (articleData) => {
    updateArticle(id, articleData);
    navigate(`/articles/${id}`);
  };

  const handleCancel = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <Box>
      <ArticleForm
        article={article}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default ArticleEditPage;