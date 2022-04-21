import axios from 'axios';

export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  async fetchPicture() {
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    const KEY = '26520489-9dedc914612f42cfe7de51211';

    const response = await axios.get(
      `?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pageNumber}&per_page=40`,
    );
    return response;
  }

  pageIncrement() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
