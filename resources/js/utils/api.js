import axios from "axios";
import Cookies from 'js-cookie';

/**
 * Fetch data with optional headers (e.g., Authorization token).
 * @param {string} url - The API endpoint to fetch data from.
 * @param {function} setter - The state setter function to update the state.
 * @param {object} headers - Additional headers like Authorization (optional).
 */
export const fetchData = async (url, setter, setIsLoggedIn, headers = {}) => {
  try {
    const response = await axios.get(url, { headers });
    setter(response.data);
    setIsLoggedIn(true);
  } catch (error) {
    if(error.response.data.message == 'Invalid Token'){
      Cookies.remove('token', { path: '/' });
      window.location.reload()
    }
  }
};

/**
 * Generic API request function with flexible HTTP methods and headers.
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE').
 * @param {string} url - API endpoint.
 * @param {object} data - Payload for POST or PUT (optional).
 * @param {object} headers - Additional headers like Authorization (optional).
 * @returns {object} Response data.
 */
export const apiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const response = await axios({ method, url, data, headers });
    return response.data;
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error.response?.data || error.message);
    throw error;
  }
};
