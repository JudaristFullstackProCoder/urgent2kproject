import { Header } from '../component/header';
import { NavbarMinimal } from '../component/navbar';

export default function Home({ setTheme, themeColor }) {
  return (
    <div>
      <Header setTheme={setTheme} themeColor={themeColor} />
      <NavbarMinimal />
    </div>
  );
}
