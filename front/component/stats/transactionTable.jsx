import { Container, Table } from "@mantine/core";
import { IconArrowDownLeft, IconArrowUpRight } from "@tabler/icons";
const elements = [
  {
    id: "6310f09e0d6f47cdc063e440",
    sender: "Jule",
    receiver: "Jean",
    amount: 1500,
    from: "XAF",
    to: "EUR",
    icon: <IconArrowUpRight color="green" />,
  },
  {
    id: "6310f0b936c0a35f1b8f534e",
    sender: "Jude",
    receiver: "Jean",
    amount: 500,
    from: "EUR",
    to: "XAF",
    icon: <IconArrowDownLeft color="red" />,
  },
];

export default function TransactionsTable({ userId: string }) {
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.sender}</td>
      <td>{element.receiver}</td>
      <td>{element.amount}</td>
      <td>{element.from}</td>
      <td>{element.to}</td>
      <td>{element.icon}</td>
    </tr>
  ));

  return (
    <Container>
      <Table
        striped
        highlightOnHover
        horizontalSpacing="sm"
        verticalSpacing="sm"
      >
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
