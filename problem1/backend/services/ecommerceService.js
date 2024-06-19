const axios = require('axios');

let authDetails = {
  tokenType: null,
  accessToken: null,
  expiresIn: null,
};

const registerCompany = async () => {
  const url = 'http://20.244.56.144/test/register';
  const payload = {
    "companyName": 'Andiogo',
    "ownerName": 'Dipu yadav',
    "rollNo": "210306105226",
    "ownerEmail": "210306105226@paruluniversity.ac.in",
    "accessCode": "QeYQhl"
  };

  try {
    const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering company:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const authenticateCompany = async () => {
  const registerResponse = await registerCompany();
  const url = 'http://20.244.56.144/test/auth';
  const payload = {
    "companyName": registerResponse.companyName,
    "clientID": registerResponse.clientID,
    "clientSecret": registerResponse.clientSecret,
    "ownerName": registerResponse.ownerName,
    "ownerEmail": registerResponse.ownerEmail,
    "rollNo": registerResponse.rollNo
  };

  try {
    const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
    console.log('Authentication successful:', response.data);
    authDetails = {
      tokenType: response.data.tokenType,
      accessToken: response.data.accessToken,
      expiresIn: response.data.expiresIn
    };
    return authDetails;
  } catch (error) {
    console.error('Error authenticating company:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const getProductsFromEcommerce = async (category) => {
  const url = `http://20.244.56.144/test/products?category=${category}`;
  
  try {
    const response = await axios.get(url, { headers: { 'Authorization': `${authDetails.tokenType} ${authDetails.accessToken}` } });
    return response.data;
  } catch (error) {
    console.error('Error fetching products from e-commerce:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { registerCompany, authenticateCompany, getProductsFromEcommerce };
