import { apiUrl } from '../const.js'

export function get () {
  axios.get(`${apiUrl}`+ 'categories').then(response => {
    this.info = response.data;
  }).catch(error => {
    this.errored = true;
  }).finally(() => (this.loading = false));
}


export function store (data) {
  console.log(data);
  axios.put(apiUrl+ '/categories/store', data).then(response => {
    this.info = response.data;
  }).catch(error => {
    this.errored = true;
  }).finally(() => (this.loading = false));
}
