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
} from '@chakra-ui/react';
import { getAllRetrievedTweets } from './../utils/api';

const MostActiveUserInPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  // Function to fetch data from the backend API
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

  const handleViewProfile = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
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
        <Text fontSize="24px" fontWeight="bold" mb="20px" color="#0eb7f4">
          Post Table
        </Text>
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
            {posts?.map((post) => (
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
              {/* Add other user details or profile information here */}
              <Text mt={4}>Description: {selectedUser?.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default MostActiveUserInPost;
