import store from 'store';
import Router from 'next/router';

export default async function LogOut() {
  store.remove('user');
  Router.push('/');
}
