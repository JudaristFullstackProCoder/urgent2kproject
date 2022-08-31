import { useEffect, useState } from 'react';
import {
  createStyles,
  Avatar,
  UnstyledButton,
  Group,
  Menu,
  Grid,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconBuildingStore,
  IconUser,
  IconSearch,
} from '@tabler/icons';
import { GithubIcon } from '@mantine/ds';
import store from 'store';
import SearchInput from './searchInput';
import CallToLoginOrSignUpActionButton from './loginButton';
import Link from 'next/link';
import ActionToggle from './colorSchemeToggle';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    margin: '0px',
    paddingRight: '0px',
    padding: '0px',
    width: '100vw',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    marginBottom: 0,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },
  searchIcon: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  githubIcon: {
    marginTop: '12px',
    marginLeft: '33px',
  },

  marginRight: {
    marginRight: '30px',
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
    '&[data-active]': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

function MenuUser({ user }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useStyles();
  return user?.useremail ? (
    <Menu
      width={260}
      position="bottom-end"
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
        >
          <Group spacing={7} className={classes.marginRight}>
            <Avatar radius="xl" size={35} color={'blue'}>
              {user['username'][0] ?? null}
            </Avatar>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>For You</Menu.Label>

        <Link href={'/user/profile'}>
          <Menu.Item
            icon={
              <IconUser size={14} color={theme.colors.indigo[7]} stroke={1.5} />
            }
          >
            Profile
          </Menu.Item>
        </Link>
        <Menu.Item
          icon={
            <IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />
          }
        >
          Liked products
        </Menu.Item>
        <Menu.Item
          icon={
            <IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />
          }
        >
          Saved products
        </Menu.Item>
        <Menu.Item
          icon={
            <IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />
          }
        >
          Your comments
        </Menu.Item>

        <Menu.Label>For Seller</Menu.Label>
        <Link href={'/dashboard/shopkeeper'}>
          <Menu.Item
            icon={
              <IconBuildingStore
                size={14}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            }
          >
            Open my shop
          </Menu.Item>
        </Link>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Link href={'/login'}>
          <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
            Change account
          </Menu.Item>
        </Link>
        <Link href={'/logout'}>
          <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>
            Logout
          </Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <>
      <CallToLoginOrSignUpActionButton />
    </>
  );
}

export function Header({ setTheme, themeColor }) {
  const { classes, theme, cx } = useStyles();
  let user = store.get('user') ?? { username: '' };
  useEffect(() => {
    user = user;
  }, [user]);

  return (
    <Grid className={classes.header}>
      <Grid.Col span={1}>
        <GithubIcon className={classes.githubIcon} size={28} />
      </Grid.Col>

      <Grid.Col
        span={8}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          paddingLeft: '23em',
          [theme.fn.smallerThan('md')]: {
            display: 'none',
          },
        })}
      >
        <SearchInput />
        <span className={classes.searchIcon}>
          <IconSearch size={18} />
        </span>
      </Grid.Col>

      <Grid.Col
        span={3}
        sx={(theme) => ({
          display: 'flex !important',
          [theme.fn.smallerThan('md')]: {
            right: '-20',
            left: '85%',
            marginLeft: '14rem',
          },
          justifyContent: 'flex-end',
          alignContent: 'center',
          alignItems: 'center',
        })}
      >
        <ActionToggle setTheme={setTheme} themeColor={themeColor} />
        <MenuUser user={user} />
      </Grid.Col>
    </Grid>
  );
}
