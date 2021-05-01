import { createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  const storageAuth = secureLs.get('store-auth');

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  if (storageAuth) {
    return storageAuth;
  }
  return stateInLocalStorage;
}

const updateStateInStorage = newState => {
  secureLs.set('store-auth', newState);
}


const configureStore = () => {

  const store = createStore(authReducer, getStateFromStorage(), window.__REDUX_DEVTOOLS_EXTENSION__());

  store.subscribe(() => {
    updateStateInStorage(store.getState());
  });

  return store;
}

export default configureStore;