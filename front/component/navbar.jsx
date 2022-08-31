import { useState } from 'react';
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Text,
  Center,
  ScrollArea,
} from '@mantine/core';
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconHistory,
  IconBuildingStore,
  IconWallet,
} from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },
  space: {
    marginBottom: '11px',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
  fixed: {
    position: 'fixed',
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" zIndex={900} transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconHistory, label: 'Historical' },
  { icon: IconBuildingStore, label: 'Subscriptions' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconWallet, label: 'Wallet' },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);
  const { classes, cx } = useStyles();

  const links = mockdata.map((link, index) => (
    <span className={classes.space} key={link.label}>
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
      <Center>
        <Text align="center" size={'xs'}>
          {link.label}
        </Text>
      </Center>
    </span>
  ));

  return (
    <Navbar height={750} width={{ base: 85 }} p="md" className={classes.fixed}>
      <Navbar.Section grow mt={5}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
