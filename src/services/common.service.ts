import axios from 'axios';
import queryString from 'query-string';
import httpStatus from 'http-status';
import ApiError from '@app/utils/ApiError';

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

/**
 * Get trending
 * @link https://developers.themoviedb.org/3/trending/get-trending
 * @param media_type
 * @param time_window
 * @returns
 */
const getUpcoming = async (language: string = 'en-US', page: number = 1, region: string) => {
  try {
    const query = queryString.stringifyUrl(
      {
        url: '/movie/upcoming',
        query: {
          language,
          page,
          region,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    const response = await axios.get(query);
    return response.data;
  } catch (error: any) {
    throw new ApiError(httpStatus.NOT_FOUND, error);
  }
};

export { getTrending };
