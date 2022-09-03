import { Header } from "../../component/header";
import UpdateUserProfile from "../../component/updateProflle";

export default function UserProfilePage({ setTheme, themeColor }) {
  return (
    <>
      <div>
        <Header setTheme={setTheme} themeColor={themeColor} />
      </div>
      <div>
        <UpdateUserProfile />
      </div>
    </>
  );
}
