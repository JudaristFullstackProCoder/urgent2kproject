import { Divider } from "@mantine/core";
import { Header } from "../component/header";
import { StatsGrid } from "../component/stats/statsGrid";
import TransactionsTable from "../component/stats/transactionTable";
import store from "store";
import Router from "next/router";
import { useEffect } from "react";

export default function Home({ setTheme, themeColor }) {
  useEffect(() => {
    if (!store.get("user")) {
      Router.push("/login");
    }
  });
  return (
    <div>
      <Header setTheme={setTheme} themeColor={themeColor} />
      <StatsGrid />
      <Divider my="sm" />
      <TransactionsTable />
    </div>
  );
}
