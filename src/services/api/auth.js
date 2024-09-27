import axiosInstance from '../config/axiosConfig';

export async function login(username, password) {
  try {
    const response = await axiosInstance.post('/authenticate', {
      username,
      password,
    });
    const { jwt } = response.data;
    localStorage.setItem('token', jwt);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    return jwt;
  } catch (error) { 
    logout()
    throw error;
  }
}

export async function register(registerDTO) {
  try {
    const response = await axiosInstance.post('/register', registerDTO);
    return response.data;
  } catch (error) {
    logout()
    throw error;
  }
}

export async function getUserInfo() {
  try {
    const response = await axiosInstance.get('/pessoas/me');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('token');
  delete axiosInstance.defaults.headers.common['Authorization'];
}
