import axios, { AxiosResponse } from "axios";
import { request } from "./apiService";
import { GEOAPIFY_API_KEY } from "@/utils/constant";

const getCoordinates = async (
  postalCode: string
): Promise<{ lat: number; lon: number } | null> => {
  try {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      postalCode
    )}&apiKey=${GEOAPIFY_API_KEY}`;
    const response: AxiosResponse = await axios.get(url);

    if (response.data.features.length > 0) {
      const [lon, lat] = response.data.features[0].geometry.coordinates;
      return { lat, lon };
    } else {
      console.error("No results found for the postal code.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates from Geoapify:", error);
    return null;
  }
};
const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRadians = (degree: number) => degree * (Math.PI / 180);
  const R = 3960;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
export const isWithinDeliveryRadius = async (
  storePostalCode: string,
  customerPostalCode: string,
  maxRadius = 5
): Promise<boolean> => {
  const storeCoordinates = await getCoordinates(storePostalCode);
  const customerCoordinates = await getCoordinates(customerPostalCode);

  if (!storeCoordinates || !customerCoordinates) {
    console.error("Unable to fetch coordinates for one or both postal codes.");
    return false;
  }

  const distance = haversineDistance(
    storeCoordinates.lat,
    storeCoordinates.lon,
    customerCoordinates.lat,
    customerCoordinates.lon
  );

  console.log(`Distance: ${distance.toFixed(2)} miles`);

  return distance <= maxRadius;
};
