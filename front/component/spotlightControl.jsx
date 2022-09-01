import { Group, createStyles } from "@mantine/core";
import { SpotlightProvider, openSpotlight } from "@mantine/spotlight";
import { IconUserCircle, IconUserSearch } from "@tabler/icons";
import axios from "axios";
import apiEndpoints from "../config/api";
import { useEffect, useState } from "react";
import SendMoneyTransaction from "./sendMoney";

const useStyles = createStyles((theme) => ({
  cursor: {
    cursor: "pointer",
  },
}));

export function SpotlightControl() {
  const { classes } = useStyles();
  return (
    <Group position="center" mt={10}>
      <IconUserSearch
        onClick={openSpotlight}
        size={25}
        className={classes.cursor}
      />
    </Group>
  );
}

export default function Spotlight() {
  const [data, setData] = useState([{}]);
  const [openModal, setOpenModal] = useState(false);
  const [userModalId, setUserModalId] = useState("");
  useEffect(() => {
    async function fetchData() {
      let dataFromApiCall = await (
        await axios.get(apiEndpoints.getAllUsers)
      ).data;
      setData(
        dataFromApiCall?.map(function (user) {
          return {
            title: user.name,
            description: user.surname,
            onTrigger: () => {
              console.log(`${user._id} ${user.surname}`);
              setOpenModal(true);
              setUserModalId(user._id);
            },
            icon: <IconUserCircle size={18} />,
          };
        })
      );
    }
    fetchData();
  }, []);

  return (
    <>
      <SpotlightProvider
        actions={data}
        searchIcon={<IconUserSearch size={18} />}
        searchPlaceholder="Search..."
        shortcut="mod + shift + 1"
        nothingFoundMessage="Nothing found..."
      >
        <SpotlightControl />
        <SendMoneyTransaction
          open={openModal}
          userId={userModalId}
          setOpen={setOpenModal}
        />
      </SpotlightProvider>
    </>
  );
}
