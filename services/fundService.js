import apiClient from "./api";

// Get all schemes (paginated)
export const getAllSchemes = async () => {
  try {
    const response = await apiClient.get("/schemes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get scheme detail
export const getFundDetails = async (amfi_code) => {
  try {
    const response = await apiClient.get(`/schemes/${amfi_code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get NAV history
export const getSchemeNAV = async (amfi_code) => {
  try {
    const response = await apiClient.get(`/schemes/${amfi_code}/nav`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search schemes
export const searchSchemes = async (query) => {
  try {
    const response = await apiClient.get("/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
