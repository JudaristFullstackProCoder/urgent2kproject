import { Button } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons';
import Link from 'next/link';

export default function CallToLoginOrSignUpActionButton() {
  return (
    <Link href={'/login'}>
      <Button
        rel="noopener noreferrer"
        href="/login"
        variant="outline"
        leftIcon={<IconUserCircle size={20} />}
        styles={(theme) => ({
          root: {
            backgroundColor: 'none',
            border: 0,
            height: 42,
            paddingLeft: 20,
            paddingRight: 20,
          },

          leftIcon: {
            marginRight: 15,
          },
        })}
      ></Button>
    </Link>
  );
}
