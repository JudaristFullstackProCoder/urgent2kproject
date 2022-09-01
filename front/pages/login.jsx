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

axios.defaults.validateStatus = () => true

const useStyles = createStyles((theme) => ({
  forgotpass: {
    cursor: 'pointer',
  },
}));

export default function AuthenticationTitle() {
  const { classes } = useStyles();
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [user, setUser] = usePersistState('user');
  const { register, formState, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const { isSubmitting, isValid, errors } = formState;
  const handleSubmition = useCallback(async (data) => {
    const response = await axios.post(endpoints.userLogin, {
      email: data.email,
      password: data.password,
    });
    console.log(response)
    if (response.status === 200) {
      setUser(response.data);
      Router.push('/');
    } else {
      setApiErrorMessage(response.data.data);
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
          <Input.Error size="lg">
            {errors['email'] ? 'invalid email !' : null}
            {apiErrorMessage?.includes('email') ? apiErrorMessage : null}
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
          <Input.Error size="lg">
            {errors['password'] && !apiErrorMessage ? 'password must have at least 6 caracters' : null}
            {apiErrorMessage?.includes('Credentials') && errors['password'] ? 'Incorrect password' : null}
          </Input.Error>
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
