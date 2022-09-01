import store from "store";
import LoginPage from "./login";

export default function LogOut() {
  store.remove("user");
  return <LoginPage />;
}
