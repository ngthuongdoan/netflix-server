import axios, { AxiosError } from 'axios';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

/**
 * Get trending
 * @link https://developers.themoviedb.org/3/trending/get-trending
 * @param media_type
 * @param time_window
 * @returns
 */
const getTrending = async (media_type = 'all', time_window = 'week') => {
  try {
    const response = await axios.get(`/trending/${media_type}/${time_window}`);
    return response.data;
  } catch (error: any) {
    throw new ApiError(httpStatus.NOT_FOUND, error);
  }
};

export { getTrending };
