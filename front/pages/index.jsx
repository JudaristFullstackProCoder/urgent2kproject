import { Divider } from "@mantine/core";
import { Header } from "../component/header";
import { StatsGrid } from "../component/stats/statsGrid";
import TransactionsTable from "../component/stats/transactionTable";

export default function Home({ setTheme, themeColor }) {
  return (
    <div>
      <Header setTheme={setTheme} themeColor={themeColor} />
      <StatsGrid />
      <Divider my="sm" />
      <TransactionsTable />
    </div>
  );
}
