import { Group, createStyles } from "@mantine/core";
import { SpotlightProvider, openSpotlight } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconUserSearch,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  cursor: {
    cursor: 'pointer',
  }
}));


export function SpotlightControl() {
  const { classes } = useStyles();
  return (
    <Group position="center" mt={10}>
      <IconUserSearch onClick={openSpotlight} size={25} className={classes.cursor} />
    </Group>
  );
}

const actions = [
  {
    title: "Home",
    description: "Get to home page",
    onTrigger: () => console.log("Home"),
    icon: <IconHome size={18} />,
  },
  {
    title: "Dashboard",
    description: "Get full information about current system status",
    onTrigger: () => console.log("Dashboard"),
    icon: <IconDashboard size={18} />,
  },
  {
    title: "Documentation",
    description: "Visit documentation to lean more about all features",
    onTrigger: () => console.log("Documentation"),
    icon: <IconFileText size={18} />,
  },
];

export default function Spotlight() {
  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconUserSearch size={18} />}
      searchPlaceholder="Search..."
      shortcut="mod + shift + 1"
      nothingFoundMessage="Nothing found..."
    >
      <SpotlightControl />
    </SpotlightProvider>
  );
}
