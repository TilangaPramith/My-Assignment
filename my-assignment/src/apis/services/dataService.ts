import api from "../axiosInstance";


export const getAPI = async(info: {endpoint: string}) => {
  // https://jsonplaceholder.typicode.com/photos
  try {
		const response = await api.get(info?.endpoint);
    console.log('get api ', info?.endpoint, response?.data?.[0]);
    
		return Promise.resolve({
			status: response?.status,
			data: response?.data,
			error: false
		});
	} catch (error) {
		console.log('getAzureAPI error ==> ', error);
		return Promise.resolve({
			status: 500,
			data: null,
			error: true
		});
	}
}