class Auth {

    constructor() {
      this.token = window.localStorage.getItem('token');

      let userData = window.localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;

      if (this.token) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
      }
    }

    login (user) {
       this.user = user
       this.getUser();
    }

    logout() {
      window.localStorage.removeItem('user');
      Event.$emit('userLoggedOut');
   }


  getUser() {
    axios.get('/api/get-user').then(({data}) => {
      this.user = data;
    }).catch(({response}) => {
      console.log(response);
      // if (response.status === 401) {
      //   this.logout();
      // }
    });
  }

  check () {
    return !! this.user;
  }

 }


 export default Auth;
