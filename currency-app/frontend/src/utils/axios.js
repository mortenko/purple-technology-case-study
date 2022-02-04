import axios from "axios";

axios.defaults.withCredentials = true;

async function axiosClient(url, method, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    url,
    method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.data = JSON.stringify(body);
  }

  return axios(config)
    .then((res) => ({
      data: res.data,
      status: res.status,
    }))
    .catch((error) => {
      throw error;
    });
}

export default axiosClient;