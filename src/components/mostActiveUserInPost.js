import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from '@chakra-ui/react';
import { getAllRetrievedTweets } from './../utils/api';

const MostActiveUserInPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getAllRetrievedTweets();
        console.log("tweets data---------->",response.data);
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts?.filter(post => {
    if (!selectedDate) return true;
    const postDate = new Date(post.createdAt).toISOString().split("T")[0];
    return postDate === selectedDate;
  });

  const displayedPosts = filteredPosts?.slice(currentIndex, currentIndex + 5);

  const handleViewProfile = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleNext = () => {
    if (currentIndex + 5 < filteredPosts.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };

  return (
    <Box p={4}>
      <Box
        backgroundColor="white"
        border="2px solid #d1d1d1"
        borderRadius="10px"
        p={6}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        maxWidth="800px"
        width="100%"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="24px" fontWeight="bold" color="#0eb7f4">Post Table</Text>
          <Input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate}
            max={new Date().toISOString().split("T")[0]}
            width="200px"
          />
        </Box>
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Post</Th>
              <Th>Likes</Th>
              <Th>Comments</Th>
              <Th>Most Active Users</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedPosts?.map((post) => (
              <Tr key={post.tweetId}>
                <Td>{post.text}</Td>
                <Td>{post.likes}</Td>
                <Td>{post.replies}</Td>
                <Td>
                  {post?.mostActiveUser?.map((user,i) => (
                  <Link key={i} color="blue.500" onClick={() => handleViewProfile(user)}>
                    {user?.name}
                  </Link>))
                  }
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
          <Button onClick={handlePrev} isDisabled={currentIndex === 0}> {currentIndex + 1} ← Previous </Button>
          <Button onClick={handleNext} isDisabled={currentIndex + 5 >= filteredPosts?.length}> Next → {currentIndex + Math.min(5, displayedPosts?.length)} </Button>
        </Box>

        {/* Modal for viewing user profile/details */}
        <Modal isOpen={selectedUser !== null} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedUser?.name}&apos;s Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box display="flex" alignItems="center">
                <Avatar size="sm" src={selectedUser?.profile_image_url} />
                <Text ml={2}>{selectedUser?.name}</Text>
              </Box>
              <Text mt={4}>Description: {selectedUser?.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleCloseModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default MostActiveUserInPost;
