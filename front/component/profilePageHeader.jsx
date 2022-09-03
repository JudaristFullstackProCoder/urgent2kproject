import { useEffect } from "react";
import { createStyles, Group, Divider } from "@mantine/core";
import { GithubIcon } from "@mantine/ds";
import store from "store";
import ActionToggle from "./colorSchemeToggle";
import Link from "next/link";
import { IconHome, IconLogin } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    margin: "0px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingRight: "0px",
    padding: "0px",
    width: "100vw",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: 0,
  },

  githubIcon: {
    marginTop: "12px",
    marginLeft: "33px",
  },

  marginRight: {
    marginRight: "30px",
  },
}));

export default function ProfilePageHeader({ setTheme, themeColor }) {
  const { classes } = useStyles();
  let user = store.get("user") ?? { name: "" };
  useEffect(() => {
    user = user;
  }, [user]);

  return (
    <>
      <Group position="apart" spacing="xs" grow>
        <Group position="left">
          <GithubIcon className={classes.githubIcon} size={28} />
        </Group>

        <Group position="center">
          <Link href={"/home"} to={"/home"}>
            <>
              Home
              <IconHome size={22} />
            </>
          </Link>
          <Link href={"/login"}>
            <>
              Login
              <IconLogin size={22} />
            </>
          </Link>
        </Group>

        <Group
          position="right"
          spacing="xs"
          sx={{
            paddingRight: "20px",
            paddingTop: "5px",
          }}
        >
          <ActionToggle setTheme={setTheme} themeColor={themeColor} />
        </Group>
      </Group>
      <Divider my="sm" />
    </>
  );
}
