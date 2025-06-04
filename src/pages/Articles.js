import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Select,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';
import ArticleCard from '../components/Articles/ArticleCard';
import ArticleForm from '../components/Articles/ArticleForm';

const Articles = () => {
  const navigate = useNavigate();
  const { articles, addArticle } = useData();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const bg = useColorModeValue('gray.50', 'gray.900');
  const emptyTextColor = useColorModeValue('gray.500', 'gray.400');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    articles.forEach(article => {
      article.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [articles]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tag filter
    if (filterTag) {
      filtered = filtered.filter(article =>
        article.tags?.includes(filterTag)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return filtered;
  }, [articles, searchTerm, filterTag, sortBy]);

  const handleCreateArticle = (articleData) => {
    const newArticle = addArticle(articleData);
    setShowForm(false);
    navigate(`/articles/${newArticle.id}`);
  };

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" align="center">
          <Heading size="xl">Articles</Heading>
          <Button
            leftIcon={<FaPlus />}
            onClick={() => setShowForm(!showForm)}
            variant="solid"
          >
            {showForm ? 'Cancel' : 'New Article'}
          </Button>
        </HStack>

        {showForm && (
          <Box bg={bg} p={6} borderRadius="lg" mb={6}>
            <ArticleForm
              onSubmit={handleCreateArticle}
              onCancel={() => setShowForm(false)}
            />
          </Box>
        )}

        {!showForm && (
          <>
            {/* Filters */}
            <HStack spacing={4} flexWrap="wrap">
              <InputGroup maxW="300px">
                <InputLeftElement>
                  <FaSearch />
                </InputLeftElement>
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Select
                placeholder="All tags"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                maxW="200px"
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </Select>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                maxW="200px"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
              </Select>
            </HStack>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    showActions={true}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Box textAlign="center" py={20}>
                <Text fontSize="lg" color={emptyTextColor}>
                  {searchTerm || filterTag
                    ? 'No articles found matching your criteria.'
                    : 'No articles yet. Create your first article!'}
                </Text>
              </Box>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Articles;