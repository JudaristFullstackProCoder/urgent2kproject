import { Badge, Container, Skeleton, Table, Text } from "@mantine/core";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconArrowsExchange2,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import store from "store";
import apiEndpoints from "../../config/api";
import axios from "axios";
import Router from "next/router";
import dateFormat from "dateformat";

export default function TransactionsTable() {
  const userFromLocalStrorage = store.get("user");
  const userId = userFromLocalStrorage?._id;
  const user = userFromLocalStrorage;
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoaging, setTransactionsLoaging] = useState(true);
  var retrieveUser = function (id) {
    const allUsers = store.get("users");
    const x = allUsers.find((e) => e._id === id);
    return x;
  };

  useEffect(() => {
    if (!userFromLocalStrorage) {
      Router.push("/");
    }
    async function fetchData() {
      const response = await (
        await axios.get(apiEndpoints.getAllTransactionsOfTheGivenUser(userId))
      ).data;
      const allUsers = await (await axios.get(apiEndpoints.getAllUsers)).data;
      store.set("users", allUsers);
      let transactionData = [];
      if (allUsers.length > 0 && response.length > 0) {
        transactionData = response.map(function (t) {
          const { name, surname } =
            t.sender === user._id
              ? { name: "You", surname: "" }
              : retrieveUser(t.sender);
          const { name: n, surname: s } =
            t.receiver === user._id
              ? { name: "You", surname: "" }
              : retrieveUser(t.receiver);

          return {
            id: t._id,
            sender: name + " " + surname,
            receiver: n + " " + s,
            amount: t.amount,
            from: t.from,
            createdAt: dateFormat(
              t.createdAt,
              "dddd, mmmm dS, yyyy, h:MM:ss TT"
            ),
            to: t.to,
            icon:
              t.sender === user._id ? (
                <Badge
                  leftSection={<IconArrowUpRight size={15} />}
                  sx={{ paddingLeft: 0 }}
                  size="lg"
                  radius="xl"
                  color="teal"
                >
                  <Text size="sm" transform="lowercase">
                    sent
                  </Text>
                </Badge>
              ) : (
                <Badge
                  leftSection={<IconArrowDownLeft color="red" size={15} />}
                  sx={{ paddingLeft: 0 }}
                  size="lg"
                  radius="xl"
                  color="red"
                >
                  <Text size="sm" transform="lowercase">
                    received
                  </Text>
                </Badge>
              ),
          };
        });
      }
      setTransactions(transactionData);
      setInterval(() => setTransactionsLoaging(false), 2000);
    }
    if (userFromLocalStrorage) {
      fetchData();
    }
  }, []);

  const rows =
    transactionsLoaging === false && transactions
      ? transactions.map(function (v) {
          return (
            <tr>
              <td>{v.sender}</td>
              <td>{v.receiver}</td>
              <td>{v.amount}</td>
              <td>{v.from}</td>
              <td>{v.to}</td>
              <td>{v.createdAt}</td>
              <td>{v.icon}</td>
            </tr>
          );
        })
      : [1, 1, 1, 1, 1, 1, 1].map((e) => (
          <tr>
            <td colSpan={6}>
              <Skeleton
                height={"30px"}
                width={"100%"}
                visible={transactionsLoaging}
              ></Skeleton>
            </td>
          </tr>
        ));

  return (
    <Container>
      <Table highlightOnHover horizontalSpacing="sm" verticalSpacing="sm">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>
              <IconArrowsExchange2 size={22} />{" "}
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
