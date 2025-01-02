import {API_BASE_URL} from '../utils/apiConfig';

const getRegisteredNurseries = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/nursery/request?pending_request=false&skip=0&limit=20`,
    );
    if (response.ok) {
      const data = await response.json();
      return {data};
    } else {
      throw new Error('Failed to fetch nurseries');
    }
  } catch (error) {
    throw error;
  }
};

const fetchNurseryRequests = async (
  pendingRequest = true,
  skip = 0,
  limit = 20,
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/nursery/request?pending_request=${pendingRequest}&skip=${skip}&limit=${limit}`,
    );

    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      return [];
    } else {
      throw new Error('Failed to fetch nursery requests');
    }
  } catch (error) {
    throw new Error(error.message || 'Error fetching nursery requests');
  }
};

const processNurseryRequest = async (nurseryId, isAccepted) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/nursery/request?nursery_id=${nurseryId}&is_accepted=${isAccepted}`,
      {
        method: 'POST',
      },
    );

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to process nursery request');
    }
  } catch (error) {
    throw new Error(error.message || 'Error processing nursery request');
  }
};

export default {
  getRegisteredNurseries,
  fetchNurseryRequests,
  processNurseryRequest,
};
