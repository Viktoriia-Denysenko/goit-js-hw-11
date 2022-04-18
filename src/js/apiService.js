export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  async fetchPicture() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '26520489-9dedc914612f42cfe7de51211';

    const response = await fetch(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pageNumber}&per_page=40`,
    );
    return await response.json();
  }

  // fetchPicture() {
  //   const BASE_URL = 'https://pixabay.com/api/';
  //   const KEY = '26520489-9dedc914612f42cfe7de51211';
  //   console.log(this);
  //   return fetch(
  //     `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pageNumber}&per_page=40`,
  //   ).then(res => {
  //     console.log(res);
  //     return res.json();
  //   });
  // }

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
