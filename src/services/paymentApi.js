import {API_BASE_URL} from '../utils/apiConfig';

const paymentApi = {
  createPaymentIntent: async amount => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: Math.round(amount)}),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Payment intent failed: ${errorData}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to create payment intent: ' + error.message);
    }
  },
};

export default paymentApi;
