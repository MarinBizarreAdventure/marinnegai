import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useData } from '../contexts/DataContext';
import ArticleView from '../components/Articles/ArticleView';

const ArticleViewPage = () => {
  const { id } = useParams();
  const { getArticleById } = useData();
  const article = getArticleById(id);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <Box>
      <ArticleView article={article} />
    </Box>
  );
};

export default ArticleViewPage;