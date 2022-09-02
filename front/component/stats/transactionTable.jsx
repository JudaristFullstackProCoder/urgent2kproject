import { Container, Skeleton, Table } from "@mantine/core";
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

  useEffect(() => {
    async function fetchData() {
      const response = await (
        await axios.get(apiEndpoints.getAllTransactionsOfTheGivenUser(userId))
      ).data;
      const transactionData = response.map(function (t) {
        return {
          id: t._id,
          sender: t.sender,
          receiver: t.receiver,
          amount: t.amount,
          from: t.from,
          to: t.to,
          icon:
            t.sender === user.sender ? (
              <IconArrowUpRight color="green" />
            ) : (
              <IconArrowDownLeft color="red" />
            ),
        };
      });
      setTransactions(transactionData);
      setInterval(() => setTransactionsLoaging(false), 3500);
    }
    fetchData();
  }, [transactionsLoaging]);

  const rows =
    transactionsLoaging === false
      ? transactions.map((element) => (
          <tr key={element.id}>
            <td>{element.sender}</td>
            <td>{element.receiver}</td>
            <td>{element.amount}</td>
            <td>{element.from}</td>
            <td>{element.to}</td>
            <td>{element.icon}</td>
          </tr>
        ))
      : [1, 1, 1, 1, 1].map((e) => (
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
