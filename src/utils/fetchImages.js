import axios from 'axios';

const API_KEY = '29476807-778104ca63f185ac7ce275560';

const pageSize = 12;

export function fetchImages(page, query) {
  return axios.get(
    'https://pixabay.com/api/?image_type=photo&orientation=horizontal',
    {
      params: {
        page,
        key: API_KEY,
        q: query,
        per_page: pageSize,
      },
    }
  );
}
