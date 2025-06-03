import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  HStack,
  Tag,
  IconButton,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useData } from '../../contexts/DataContext';

const ArticleCard = ({ article, showActions = false }) => {
  const navigate = useNavigate();
  const { deleteArticle } = useData();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(article.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/articles/edit/${article.id}`);
  };

  const handleClick = () => {
    navigate(`/articles/${article.id}`);
  };

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
      cursor="pointer"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      onClick={handleClick}
    >
      <Stack spacing={3}>
        <Heading size="md">{article.title}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} noOfLines={2}>
          {article.description}
        </Text>
        <HStack spacing={2} flexWrap="wrap">
          {article.tags?.map((tag, index) => (
            <Tag key={index} size="sm" variant="subtle" colorScheme="gray">
              {tag}
            </Tag>
          ))}
        </HStack>
        <HStack justify="space-between" align="center">
          <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
            {new Date(article.createdAt).toLocaleDateString()}
          </Text>
          {showActions && (
            <HStack spacing={2}>
              <IconButton
                aria-label="Edit article"
                icon={<FaEdit />}
                size="sm"
                variant="ghost"
                onClick={handleEdit}
              />
              <IconButton
                aria-label="Delete article"
                icon={<FaTrash />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={handleDelete}
              />
            </HStack>
          )}
        </HStack>
      </Stack>
    </Box>
  );
};

export default ArticleCard;