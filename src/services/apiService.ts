import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";
let baseUrl = "/api/";

const request = async (
  endpoint: string,
  method: Method = "GET",
  data?: any
): Promise<AxiosResponse> => {
  try {
    const url = `${baseUrl}${endpoint}`;
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: AxiosRequestConfig = {
      url,
      method,
      headers,
      data,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export { request };
