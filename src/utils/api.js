import ApiClient from "./apiClient";

// Function to handle API errors
const handleApiError = (exception) => {
  return {
    error: true,
    exception,
  };
};

// API methods

export const getAllRetrievedTweets = async () => {
  try {
    return await ApiClient.get(`/api/twitter/savedTweets`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const generateTweet = async () => {
  try {
    return await ApiClient.post(`/api/twitter/generate`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const updateStatsBot = async () => {
  try {
    return await ApiClient.post(`/api/twitter/updateStatsbot`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getStats = async () => {
  try {
    return await ApiClient.get(`/api/twitter/stats`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getInteractions = async () => {
  try {
    return await ApiClient.get(`/api/twitter/interactions`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const updateMess = async () => {
  try {
    return await ApiClient.put(`/api/twitter/updateMess`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getWelcoming = async () => {
  try {
    return await ApiClient.get(`/api/twitter/getWelcoming`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getMess = async () => {
  try {
    return await ApiClient.get(`/api/twitter/getMess`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getLast100Tweets = async () => {
  try {
    return await ApiClient.get(`/api/twitter/tweetsActivity`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const sendGroupMessage = async () => {
  try {
    return await ApiClient.post(`/api/twitter/sendGroupmessage`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const sendMessage = async () => {
  try {
    return await ApiClient.post(`/api/twitter/sendMessage`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const sendWelcome = async () => {
  try {
    return await ApiClient.post(`/api/twitter/sendWelcome`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getSavedTweets = async () => {
  try {
    return await ApiClient.get(`/api/twitter/savedTweets`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getSavedMostActiveUsers = async () => {
  try {
    return await ApiClient.get(`/api/twitter/savedMostActiveUsers`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getSavedMostActiveUserForATweet = async (id) => {
  try {
    return await ApiClient.get(`/api/twitter/savedMostActiveUserForATweet/${id}`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getFollowers = async () => {
  try {
    return await ApiClient.get(`/api/twitter/followers`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const getEndFollowers = async () => {
  try {
    return await ApiClient.get(`/api/twitter/endfollowers`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

export const verifyMe = async () => {
  try {
    return await ApiClient.get(`/api/twitter/verify`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

// Method to log in as admin
export const logAdmin = async () => {
  try {
    return await ApiClient.post(`/api/auth/logadmin`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

// Method to create a new admin
export const createAdmin = async () => {
  try {
    return await ApiClient.post(`/api/auth/createadmin`);
  } catch (exception) {
    return handleApiError(exception);
  }
};

// Method to change admin password
export const changePassword = async () => {
  try {
    return await ApiClient.put(`/api/auth/changepsd`);
  } catch (exception) {
    return handleApiError(exception);
  }
};