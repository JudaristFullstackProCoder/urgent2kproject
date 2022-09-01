// import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { ActionIcon } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { useCallback } from "react";

export default function ActionToggle({ themeColor, setTheme }) {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const updateTheme = useCallback(() => {
    setTheme(themeColor == "light" ? "dark" : "light");
  });


  return (
      <ActionIcon
        onClick={updateTheme}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {themeColor === "dark" ? (
          <IconSun size={25} />
        ) : (
          <IconMoonStars size={25} />
        )}
      </ActionIcon>
  );
}
