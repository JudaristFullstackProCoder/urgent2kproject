/**
 * Statefull session (server side)
 *
 * This hook is call before rendering a page component
 * this hook look if the user informations is in the local storage, if yes call the api (on server) to check if the user session is active
 * if not (the user session is not active) it use the user informations (in local strorage: username & password) to login the user via api call (if the auth failed the user will be redirect in home page).
 * if yes (the user session is active) do nothing;
 * if the user informations isn't in local strorage, redirect the user to login page (on login store user informations in local strorage)
 */
import store from 'store';
import axios from 'axios';
import apiEndpoints from '../config/api';
import { useState } from 'react';

/**
 *
 * @param {Number} limit will retry to auth user (is auth failed yet) limit time
 * @Param {Boolean} shopkeeper if true open store
 * @returns string[]
 */
export default async function useServerSession(limit = 7, shopkeeper = false) {
  const [requireAuth, setRequireAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [storeOpened, setStoreOpened] = useState(false);
  let retry = 0;
  const user = store.get('user');
  const sessionOnTheServer = await axios.get(apiEndpoints.getSession);
  if (!sessionOnTheServer?.user) {
    // the user session isn't active
    let result = await axios.post(apiEndpoints.userLogin, {
      email: user?.email,
      password: user?.password,
    });
    if (result.data.message) {
      // message property is the message of the returned from the server
      // there is error !
      //  Redirect user to login page to auth the user
      // ceci n'est pas sensé arrivé si l'utilisateur ne modifi pas les données qui sont dans local Strorage
      // or (in the case when the user auth failed not because of invalids credentials but because of somethinf else)
      setRequireAuth(true);
      while (result.data.message) {
        if (retry >= limit) {
          setRequireAuth(true);
          setAuthLoading(false); // terminate
        }
        result = await axios.post(apiEndpoints.userLogin, {
          email: user?.email,
          password: user?.password,
        });
        if (!result.data.message) {
          setAuthLoading(false);
          setRequireAuth(false);
          if (shopkeeper === true) {
            while (storeOpened === false) {
              const responseStore = await axios.post(apiEndpoints.openStore);
              if (responseStore.data.shopkeeperId) {
                // ok store opened
                setStoreOpened(false);
                store.set('shopkeeper', responseStore.data);
              }
            }
          }
          store.set('user', result);
        } else {
          retry += 1;
        }
      }
    } else {
      // is user was successfully authenticated, save user informations into local strorage
      setAuthLoading(false);
      setAuthRequired(false);
      if (shopkeeper === true) {
        while (storeOpened === false) {
          const responseStore = await axios.post(apiEndpoints.openStore);
          if (responseStore.data.shopkeeperId) {
            // ok store opened
            setStoreOpened(false);
            store.set('shopkeeper', responseStore.data);
          }
        }
      }
      store.set('user', result.data);
    }
  }
  return [requireAuth, authLoading];
}
