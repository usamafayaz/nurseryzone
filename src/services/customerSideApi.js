import {API_BASE_URL} from '../utils/apiConfig';

const fetchAllPlants = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/nursery/plants?skip=0&limit=20`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error fetching the Products');
    }
  } catch (error) {
    throw error;
  }
};

const fetchProductReviews = async id => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/?plant_id=${id}`);
    if (response.ok) {
      const data = await response.json();
      return {data};
    } else {
      throw new Error('Error fetching Reviews');
    }
  } catch (error) {
    throw error;
  }
};

const placeCustomerOrder = async data => {
  try {
    const response = await fetch(`${API_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (response.ok) {
      return true;
    } else {
      throw new Error('Error Placing the Order');
    }
  } catch (error) {
    throw error;
  }
};
const getImageUrl = imagePath => {
  return `${API_BASE_URL}${imagePath}`;
};

const submitCustomerFeedback = async data => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data,
    });

    if (!response.ok) throw new Error('Failed to submit feedback');
    else return true;
  } catch (error) {
    throw error;
  }
};

const fetchMyOrders = async user_id => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/order/${user_id}?skip=0&limit=20`,
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch orders');
    }
  } catch (err) {
    throw err;
  }
};

export default {
  fetchAllPlants,
  fetchProductReviews,
  placeCustomerOrder,
  getImageUrl,
  submitCustomerFeedback,
  fetchMyOrders,
};
