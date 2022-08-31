import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  createStyles,
  Alert,
  Input,
} from '@mantine/core';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Router from 'next/router';
import endpoints from '../config/api';
import usePersistState from '../hooks/usePersistState';

const useStyles = createStyles((theme) => ({
  forgotpass: {
    cursor: 'pointer',
  },
}));

export default function AuthenticationTitle() {
  const { classes } = useStyles();
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [user, setUser] = usePersistState('user');
  const { register, formState, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const { isSubmitting, isValid, errors } = formState;
  console.log(errors, formState);
  const handleSubmition = useCallback(async (data) => {
    const response = await axios.post(endpoints.userLogin, {
      email: data.email,
      password: data.password,
    });
    if (!response.data.status) {
      setUser(response.data);
      Router.push('/');
    } else {
      setApiErrorMessage(response.data.message);
    }
  });

  return (
    <Container size={420} my={40}>
      <form method="POST" autoComplete="off">
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Link href={'/signup'}> Create account </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            disabled={isSubmitting}
            label="Email"
            placeholder="you@mantine.dev"
            name="email"
            required
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/,
            })}
          />
          <Input.Error size="sm">
            {errors['email'] ? 'invalid email !' : null}
          </Input.Error>
          <PasswordInput
            label="Password"
            disabled={isSubmitting}
            placeholder="Your password"
            required
            name="password"
            {...register('password', {
              required: true,
              minLength: 6,
            })}
            mt="md"
          />
          <Input.Error size="sm">
            {errors['password'] ? 'invalid password !' : null}
          </Input.Error>
          {apiErrorMessage ? (
            <Alert color={'red'} withCloseButton={false}>
              {apiErrorMessage}
            </Alert>
          ) : null}
          <Group position="apart" mt="md">
            <Link href={'/resetpass'} unselectable={true} color={'blue'}>
              <Text
                underline
                weight={300}
                color={'blue'}
                className={classes.forgotpass}
              >
                Forgot password ?
              </Text>
            </Link>
          </Group>
          <Button
            variant="outline"
            disabled={!isValid}
            loading={isSubmitting}
            fullWidth
            mt="xl"
            onClick={handleSubmit(
              async (data, e) => {
                await handleSubmition(data);
              },
              (errors) => {},
            )}
          >
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
