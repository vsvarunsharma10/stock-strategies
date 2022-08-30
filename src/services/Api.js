import axios from "axios";

export default () => {
	let baseURL = "https://apiconnect.angelbroking.com";

    let axios_obj = axios.create({
		baseURL: baseURL
	});

	axios_obj.defaults.headers.common["Accept"] = "application/json";
	axios_obj.defaults.headers.common["Content-Type"] = "application/json";
	// axios.defaults.headers.post["Content-Type"] = "application/json";

	// For canceling the other req

	// // Add a request interceptor
	axios_obj.interceptors.request.use(
		function(config) {
			config.headers["Authorization"] = localStorage.getItem("token");
			return config;
		},
		function(error) {
			return Promise.reject(error);
		}
	);

	// Add a response interceptor
	axios_obj.interceptors.response.use(
		function(error) {
			if (axios.isCancel(error)){}
			else if (error && error.response && error.response.status == 444) { // Change status code to capture JWT token expired
				localStorage.setItem("token", "");
                location.reload();
			}
			return Promise.reject(error);
		}
	);

	return axios_obj;
};