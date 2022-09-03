import { Badge, Container, Skeleton, Table, Text } from "@mantine/core";
import { IconArrowDownLeft, IconArrowUpRight } from "@tabler/icons";
import { useEffect, useState } from "react";
import store from "store";
import apiEndpoints from "../../config/api";
import axios from "axios";

export default function TransactionsTable() {
  const userId = store.get("user")._id;
  const user = store.get("user");
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoaging, setTransactionsLoaging] = useState(true);
  var retrieveUser = function (id) {
    const allUsers = store.get("users");
    const x = allUsers.find((e) => e._id === id);
    return x;
  };

  useEffect(() => {
    async function fetchData() {
      const response = await (
        await axios.get(apiEndpoints.getAllTransactionsOfTheGivenUser(userId))
      ).data;
      const allUsers = await (await axios.get(apiEndpoints.getAllUsers)).data;
      store.set("users", allUsers);
      const transactionData = response.map(function (t) {
        const { name, surname } = retrieveUser(t.sender);
        const { name: n, surname: s } = retrieveUser(t.receiver);
        return {
          id: t._id,
          sender: name + " " + surname,
          receiver: n + " " + s,
          amount: t.amount,
          from: t.from,
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
                sent
              </Badge>
            ) : (
              <Badge
                leftSection={<IconArrowDownLeft color="red" size={15} />}
                sx={{ paddingLeft: 0 }}
                size="lg"
                radius="xl"
                color="red"
              >
                <Text size="xl">received</Text>
              </Badge>
            ),
        };
      });
      setTransactions(transactionData);
      setInterval(() => setTransactionsLoaging(false), 2000);
    }
    fetchData();
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
            <th>from</th>
            <th>to</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
