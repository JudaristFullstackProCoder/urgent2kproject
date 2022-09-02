import { Group, createStyles } from "@mantine/core";
import { SpotlightProvider, openSpotlight } from "@mantine/spotlight";
import { IconUserCircle, IconUserSearch } from "@tabler/icons";
import axios from "axios";
import apiEndpoints from "../config/api";
import { useCallback, useEffect, useState } from "react";
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
  const closeModal = useCallback(() => setOpenModal(false));
  const [userModal, setUserModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      let dataFromApiCall = await (
        await axios.get(apiEndpoints.getAllUsers)
      ).data;
      let a = [];
      dataFromApiCall?.map(function (user) {
        a.push({
          title: user.name,
          description: user.surname,
          onTrigger: () => {
            console.log(user, user._id, user.surname);
            setOpenModal(true);
            setUserModal(user);
          },
          icon: <IconUserCircle size={18} />,
        });
        setData(a);
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <SpotlightProvider
        actions={data ?? []}
        searchIcon={<IconUserSearch size={18} />}
        searchPlaceholder="Search..."
        shortcut="mod + shift + 1"
        nothingFoundMessage="Nothing found..."
      >
        <SpotlightControl />
        {userModal ? (
          <SendMoneyTransaction
            open={openModal}
            userModal={userModal}
            setOpen={setOpenModal}
            closeModal={closeModal}
          />
        ) : (
          <div></div>
        )}
      </SpotlightProvider>
    </>
  );
}
