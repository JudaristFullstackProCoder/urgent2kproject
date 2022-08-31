import { Header } from '../component/header';

export default function Home({ setTheme, themeColor }) {
  return (
    <div>
      <Header setTheme={setTheme} themeColor={themeColor} />
    </div>
  );
}
