import axios from "axios";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";


let baseURL = "http://10.0.0.7:4000/api" //for physical device android

const createClientApi = async () => {
  const isEmulator = await DeviceInfo.isEmulator();

  if (Platform.OS === 'android' && isEmulator) {
    baseURL = "http://10.0.2.2:4000/api";
  }
  return axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

let apiClient: any = null;

export const getClientApi = async () => {
  if (!apiClient)
    apiClient = await createClientApi()

  return apiClient;
}
// Function to set the Authorization header for requests
export const setAuthToken = (token: string | null) => {
  if (apiClient) {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }
}

