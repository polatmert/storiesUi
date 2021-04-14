import {createStore} from 'redux';
import authReducer from './authReducer';


const loggedInState = {
    isLoggedIn: true,
    username: "mert",
    displayName: "mert_p",
    image: null,
    password: 'Pasword'
  };


  const configureStore = () =>{
    return createStore(authReducer , loggedInState, window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  export default configureStore;