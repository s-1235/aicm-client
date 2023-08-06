import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Tabs,
  TabList,
  Tab,
  Grid,
  GridItem,
  Heading,
  Text,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast
} from '@chakra-ui/react';
import MostActiveFollowers from '@/components/mostActiveFollowers';
import ActiveFollowersDetails from '@/components/activeFollowersDetails';
import MostActiveUserInPost from '@/components/mostActiveUserInPost';
import TweetForm from '@/components/tweet';
import { FiUsers, FiUserCheck, FiUserPlus, FiEdit } from 'react-icons/fi';
import { RepeatIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { getLast100Tweets } from '@/utils/api';

const Dashboard = () => {
  const router = useRouter();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('MostActiveFollowers');
  const [isTweetModalOpen, setTweetModalOpen] = useState(false);

  const handleFetchNewData = async () => {
    try {
      const response = await getLast100Tweets();
      console.log("Reponse is ------------>",response);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "New data fetched successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom"
        });
        // Re-render the page
        router.push(router.asPath);
      } else {
        toast({
          title: "Error",
          description: "There was an error fetching the data.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error fetching the data.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  const handleOpenTweetModal = () => {
    setTweetModalOpen(true);
  };

  const handleCloseTweetModal = () => {
    setTweetModalOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
  }, [router]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'MostActiveFollowers':
        return <MostActiveFollowers />;
      case 'ActiveFollowersDetails':
        return <ActiveFollowersDetails />;
      case 'MostActiveUserInPost':
        return <MostActiveUserInPost />;
      default:
        return <MostActiveFollowers />;
    }
  };

  const sectionNames = {
    MostActiveFollowers: 'Most Active Followers',
    ActiveFollowersDetails: 'Active Followers Details',
    MostActiveUserInPost: 'Most Active User in a Post',
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <GridItem bg="gray.100" p={4} borderRadius="md" position="fixed" height="100%" zIndex={10}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <Box as="span" fontSize="xl" fontWeight="bold" color="blue.500">
            AICM
          </Box>
          <Text fontSize="xl" fontWeight="bold" ml={1.5}>
            Dashboard
          </Text>
        </Box>

        <Tabs
          colorScheme="blue"
          variant="enclosed"
          flexDirection="column"
          alignItems="flex-start"
        >
          <TabList mt={4} display="flex" flexDirection="column">
            {Object.entries(sectionNames).map(([key, value]) => (
              <React.Fragment key={key}>
                {key !== 'MostActiveFollowers' && <Divider my={2} borderColor="gray.600" />}
                <Tab
                  onClick={() => setActiveTab(key)}
                  _selected={{ color: 'white', bg: 'blue.500' }}
                  _focus={{ boxShadow: 'none' }}
                  borderRadius="md"
                  p={3}
                  mb={2}
                  fontSize="lg"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                >
                  {key === 'MostActiveFollowers' && <FiUsers size={20} style={{ marginRight: '8px' }} />}
                  {key === 'ActiveFollowersDetails' && <FiUserCheck size={20} style={{ marginRight: '8px' }} />}
                  {key === 'MostActiveUserInPost' && <FiUserPlus size={20} style={{ marginRight: '8px' }} />}
                  {value}
                </Tab>
              </React.Fragment>
            ))}
            <Divider my={2} borderColor="gray.600" />
          </TabList>
        </Tabs>
      </GridItem>

      {/* Right Side */}
      <GridItem ml="140px" mt="50px" width="calc(100% - 250px)">
        <Box p={4} borderRadius="md" ml="250px" height="100vh" overflowY="auto">
          <Box display="flex" justifyContent="flex-end" mb="8">
            <Button variant="outline" mr="4" colorScheme="blue" onClick={handleFetchNewData}>
              <RepeatIcon size={20} style={{ marginRight: '8px' }} />
              Fetch New Data
            </Button>
            <Button variant="outline" mr="4" colorScheme="blue" onClick={handleOpenTweetModal}>
              <FiEdit size={20} style={{ marginRight: '8px' }} />
              Tweet
            </Button>
            <Button variant="outline" colorScheme="blue">
              <FiUsers size={20} style={{ marginRight: '8px' }} />
              Account
            </Button>
            <Button variant="outline" colorScheme="red" ml={4}>
              <FiUsers size={20} style={{ marginRight: '8px' }} />
              Logout
            </Button>
          </Box>
          {renderTabContent()}
        </Box>
      </GridItem>

      {/* Tweet Modal */}
      <Modal isOpen={isTweetModalOpen} onClose={handleCloseTweetModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Tweet With AI</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TweetForm onClose={handleCloseTweetModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
