import {API_BASE_URL} from '../utils/apiConfig';

const addDeliveryBoy = async data => {
  try {
    const response = await fetch(`${API_BASE_URL}/delivery/boy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return true;
    } else throw new Error('Error Occured while adding Delivery Boy');
  } catch (error) {
    throw error;
  }
};

const addPlant = async (user_id, plantData) => {
  try {
    const formData = new FormData();

    formData.append('nursery_id', user_id);
    formData.append('name', plantData.name);
    formData.append('description', plantData.description);
    formData.append('price', plantData.price);
    formData.append('stock', plantData.stock);
    formData.append('image', {
      uri: plantData.image.uri,
      type: plantData.image.type,
      name: plantData.image.fileName,
    });

    const response = await fetch(`${API_BASE_URL}/nursery/plant`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      return true;
    } else throw new Error('Error while adding new Plant!');
  } catch (err) {
    throw err;
  }
};
const fetchAllReviews = async user_id => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/${user_id}`);

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Error while fetching Reviews!');
    }
  } catch (error) {
    throw error;
  }
};
const fetchNurseryPlants = async nursery_id => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/nursery/plants?nursery_id=${nursery_id}&skip=0&limit=20`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status == 404) {
      throw new Error('No plants Found!');
    } else throw new Error('Error while fetching plants!');
  } catch (error) {
    throw error;
  }
};
const editPlant = async plant => {
  try {
    const formData = new FormData();

    formData.append('plant_id', plant.plant_id.toString());
    formData.append('name', plant.name);
    formData.append('description', plant.description);
    formData.append('price', plant.price.toString());
    formData.append('stock', parseInt(plant.stock).toString());

    if (plant.image && plant.image.uri) {
      formData.append('image', {
        uri: plant.image.uri,
        type: 'image/jpeg',
        name: 'plant_image.jpg',
      });
    }

    const response = await fetch(`${API_BASE_URL}/nursery/plant`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const responseData = await response.json();
    if (response.ok) return true;
    else throw new Error(responseData.message || 'Failed to update plant');
  } catch (error) {
    throw error;
  }
};
const deletePlant = async plantId => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/nursery/plant?plant_id=${plantId}`,
      {method: 'DELETE'},
    );
    if (response.ok) {
      return true;
    }
  } catch (error) {
    throw new Error('Error while deleting the plant');
  }
};
const fetchDeliveryBoys = async nurseryId => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/delivery/boy?nursery_id=${nurseryId}`,
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    throw error;
  }
};
const fetchCustomersOrders = async nurseryId => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/order?nursery_id=${nurseryId}&skip=0&limit=20`,
    );
    if (response.ok) {
      const data = await response.json();
      return data.reverse();
    }
  } catch (error) {
    throw error;
  }
};
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/order/status?order_id=${orderId}&status=${newStatus}`,
      {method: 'PUT'},
    );
    if (response.ok) return true;
  } catch (err) {
    console.error(err);
  }
};
const assignDelivery = async (orderId, deliveryBoyID) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/delivery/schedule?delivery_boy_id=${deliveryBoyID}&order_id=${orderId}`,
      {method: 'POST'},
    );
    if (response.ok) return true;
    else return false;
  } catch (err) {
    console.error(err);
  }
};

export default {
  addDeliveryBoy,
  fetchAllReviews,
  fetchNurseryPlants,
  deletePlant,
  editPlant,
  addPlant,
  fetchCustomersOrders,
  fetchDeliveryBoys,
  updateOrderStatus,
  assignDelivery,
};
