import ProfilePageHeader from "../component/profilePageHeader";
import UpdateUserProfile from "../component/updateProflle";

export default function UserProfilePage({ setTheme, themeColor }) {
  return (
    <>
      <div>
        <ProfilePageHeader setTheme={setTheme} themeColor={themeColor} />
      </div>
      <div>
        <UpdateUserProfile />
      </div>
    </>
  );
}
