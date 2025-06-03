import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Button,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';

const ArticleView = ({ article }) => {
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mdBg = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box>
      <HStack spacing={4} mb={6}>
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate('/articles')}
          variant="ghost"
        >
          Back to Articles
        </Button>
        <Button
          leftIcon={<FaEdit />}
          onClick={() => navigate(`/articles/edit/${article.id}`)}
          variant="outline"
        >
          Edit Article
        </Button>
      </HStack>

      <Box bg={bg} p={8} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
        <VStack align="stretch" spacing={4}>
          <Heading size="xl">{article.title}</Heading>
          
          <HStack spacing={4} color={useColorModeValue('gray.600', 'gray.400')}>
            <Text fontSize="sm">
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            {article.updatedAt && (
              <Text fontSize="sm">
                (Updated: {new Date(article.updatedAt).toLocaleDateString()})
              </Text>
            )}
          </HStack>

          <HStack spacing={2} flexWrap="wrap">
            {article.tags?.map((tag, index) => (
              <Tag key={index} size="md" variant="subtle" colorScheme="gray">
                {tag}
              </Tag>
            ))}
          </HStack>

          <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
            {article.description}
          </Text>

          <Divider my={4} />

          <Box
            className="markdown-content"
            bg={mdBg}
            p={6}
            borderRadius="md"
            sx={{
              '& h1': {
                fontSize: '2xl',
                fontWeight: 'bold',
                mb: 4,
                mt: 6,
              },
              '& h2': {
                fontSize: 'xl',
                fontWeight: 'bold',
                mb: 3,
                mt: 5,
              },
              '& h3': {
                fontSize: 'lg',
                fontWeight: 'bold',
                mb: 2,
                mt: 4,
              },
              '& p': {
                mb: 4,
                lineHeight: 1.7,
              },
              '& ul, & ol': {
                pl: 6,
                mb: 4,
              },
              '& li': {
                mb: 2,
              },
              '& code': {
                bg: useColorModeValue('gray.200', 'gray.700'),
                px: 1,
                py: 0.5,
                borderRadius: 'sm',
                fontSize: 'sm',
              },
              '& pre': {
                bg: useColorModeValue('gray.200', 'gray.700'),
                p: 4,
                borderRadius: 'md',
                overflowX: 'auto',
                mb: 4,
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: useColorModeValue('gray.300', 'gray.600'),
                pl: 4,
                py: 2,
                mb: 4,
                fontStyle: 'italic',
              },
            }}
          >
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ArticleView;