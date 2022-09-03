import { createStyles, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import apiEndpoints from "../../config/api";
import store from "store";
import Router from "next/router";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export function StatsGrid() {
  const userFromLocalStrorage = store.get("user");
  if (!userFromLocalStrorage) {
    Router.push("/login");
  }
  const { classes } = useStyles();
  const [user, setUser] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const u = await (
        await axios.get(apiEndpoints.getUserById(userFromLocalStrorage._id))
      ).data;
      const t = await (
        await axios.get(
          apiEndpoints.getAllTransactionsOfTheGivenUser(
            userFromLocalStrorage._id
          )
        )
      ).data;
      setUser(u);
      setUserTransactions(t);
      setLoading(false);
    }
    if (userFromLocalStrorage) {
      fetchData();
    }
  }, []);

  const balance = user.amount;
  let countSent = 0;
  let countReceive = 0;
  userTransactions.map((e) => {
    if (e.sender === user._id) {
      countSent += e.amount;
    }
  });
  userTransactions.map((e) => {
    if (e.receiver === user._id) {
      countReceive += e.amount;
    }
  });

  const d = [
    {
      title: "Balance",
      icon: "receipt",
      value: `${balance || ""}  ${user?.country?.currency || ""}`,
    },
    {
      title: "Sent",
      icon: "coin",
      value: `${countSent || ""} ${user?.country?.currency || 0}`,
    },
    {
      title: "Received",
      icon: "discount",
      value: `${user?.received || ""} ${user?.country?.currency || 0}`,
    },
    {
      title: "Transaction",
      icon: "coin",
      value: `${userTransactions?.length || 0}`,
    },
  ];

  const stats = d.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? "teal" : "red"}
            size="sm"
            weight={500}
            className={classes.diff}
          ></Text>
        </Group>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}
