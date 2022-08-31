import { Modal, Input, Button, Alert, Text, createStyles } from '@mantine/core';
import {
  IconAt,
  IconFingerprint,
  IconLogin,
  IconAlertCircle,
  IconArrowLeft,
} from '@tabler/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import apiConfig from '../config/api';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import usePersistentState from '../hooks/usePersistState';
import store from 'store';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  pointer: {
    cursor: 'pointer',
    display: 'inline',
  },
  allWidth: {
    width: '100%',
    display: 'block',
  },
  backToHomePage: {
    display: 'inline',
    marginLeft: '5em',
  },
  inline: {
    display: 'inline',
  },
}));

export default function SignUp() {
  const { classes } = useStyles();
  const [apiErrors, setApiErrors] = useState(null);
  const [value, setValue] = usePersistentState('user');
  const formRef = useRef();
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });
  const { errors, isSubmitting, isValid } = formState;
  const [loading, setLoading] = useState(isSubmitting);
  const [open, setOpen] = useState(false);
  const handleSubmition = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiConfig.userSignUp,
        {
          username: data.username,
          password: data.password,
          email: data.email,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': apiConfig.home,
          },
        },
      );
      setLoading(false);
      console.log(response);
      if (response.data.status) {
        // there was an error
        setApiErrors(response.data.message);
      } else {
        setValue(response.data);
        await Router.push('/');
      }
    } catch (e) {}
  });

  return (
    <form method="POST" autoComplete="off" ref={formRef}>
      {/* password doesn't match */}
      <Modal
        opened={open}
        overlayColor={'white'}
        overlayOpacity={0}
        zIndex={1000}
        lockScroll
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={true}
        onClose={() => setOpen(false)}
      >
        <Alert
          icon={<IconAlertCircle size={16} />}
          variant={'filled'}
          title="Error ☹"
          color="red"
        >
          Sorry these two passwords do not match
        </Alert>
      </Modal>
      {/* password doesn't match */}
      <Modal
        opened={true}
        overlayOpacity={0.2}
        title="Introduce yourself!"
        closeOnClickOutside={false}
        closeOnEscape={false}
        centered={+true}
        withCloseButton={false}
      >
        {/* Modal content */}
        <Input.Wrapper
          label="Email"
          description="Please type your email here !"
          required={true}
          placeholder="youremail@gmail.com"
          styles={() => ({
            root: {
              marginBottom: '10px',
            },
          })}
        >
          <Input
            autoFocus={true}
            autoComplete={'off'}
            disabled={loading}
            invalid={errors['email'] ? true : false}
            icon={<IconAt />}
            {...register('email', {
              required: true,
              minLength: 6,
              pattern: /^\S+@\S+$/,
            })}
            iconWidth={18}
            variant="filled"
            size="sm"
            required={+true}
            name="email"
            type={'email'}
            pattern={/^\S+@\S+$/}
          />
          <Input.Error size="sm">
            {errors['email'] ? 'invalid email !' : null}
            {apiErrors && apiErrors.includes('email')
              ? 'this email is not available, try another one'
              : null}
          </Input.Error>
        </Input.Wrapper>
        <Input.Wrapper
          label="Username"
          description="Please type your username here !"
          required={true}
          placeholder="your username"
          styles={() => ({
            root: {
              marginBottom: '10px',
            },
          })}
        >
          <Input
            autoFocus={true}
            disabled={loading}
            icon={<IconAt />}
            {...register('username', {
              required: true,
              minLength: 4,
            })}
            invalid={errors['username'] ? true : false}
            iconWidth={18}
            variant="filled"
            autoComplete="off"
            size="sm"
            required={+true}
            name="username"
            type={'text'}
          />
          <Input.Error size="sm">
            {errors['username'] ? 'invalid username !' : null}
            {apiErrors && apiErrors.includes('username')
              ? 'this username is not available, try another one'
              : null}
          </Input.Error>
        </Input.Wrapper>
        <Input.Wrapper
          label="Password"
          description="Please type your password here !"
          required={true}
          styles={() => ({
            root: {
              marginBottom: '10px',
            },
          })}
        >
          <Input
            disabled={loading}
            icon={<IconFingerprint />}
            iconWidth={18}
            variant="filled"
            type={'password'}
            size="sm"
            invalid={errors['password'] ? true : false}
            required={+true}
            name="password"
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 50,
            })}
          />
          <Input.Error size="sm">
            {errors['password'] ? 'invalid password !' : null}
          </Input.Error>
        </Input.Wrapper>
        <Input.Wrapper
          label="Password Confirmation"
          description="Please confirm your password!"
          required={true}
          styles={() => ({
            root: {
              marginTop: '5px',
            },
          })}
        >
          <Input
            disabled={loading}
            icon={<IconFingerprint />}
            iconWidth={18}
            variant="filled"
            size="sm"
            required={+true}
            invalid={errors['password_confirm'] ? true : false}
            name={'password_confirm'}
            type="password"
            {...register('password_confirm', {
              required: true,
              minLength: 6,
              maxLength: 50,
            })}
          />
          <Input.Error size="sm">
            {errors['password_confirm']
              ? 'these passwords do not match !'
              : null}
          </Input.Error>
        </Input.Wrapper>
        <Button
          variant="default"
          color="blue"
          disabled={!isValid}
          type="submit"
          leftIcon={<IconLogin size={18} />}
          loading={loading}
          onClick={handleSubmit(async (data, e) => {
            if (data.password !== data.password_confirm) {
              console.log('password are not identical');
              setOpen(true);
            } else {
              await handleSubmition(data);
            }
          })}
          styles={() => ({
            root: {
              margin: '20px',
              marginLeft: '0px',
              marginTop: '30px',
            },
          })}
        >
          {' '}
          SignUp Now
        </Button>
        <Text className={classes.allWidth} size={'sm'}>
          Already have an account ?{' '}
          <Link href={'/login'} color="blue">
            <Text
              className={classes.pointer}
              weight={500}
              size={'sm'}
              underline
              color={'blue'}
            >
              Login
            </Text>
          </Link>
          <Text className={classes.backToHomePage}>
            <Link href={'/'} color="blue">
              <Text
                className={classes.pointer}
                weight={300}
                size={'sm'}
                underline
                color={'blue'}
              >
                <IconArrowLeft
                  className={classes.inline}
                  size={14}
                  stroke={1.5}
                />{' '}
                back to home
              </Text>
            </Link>
          </Text>
        </Text>
      </Modal>
    </form>
  );
}
