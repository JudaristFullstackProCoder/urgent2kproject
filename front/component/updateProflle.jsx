import {
  Input,
  Button,
  createStyles,
  Center,
  Text,
  Alert,
  TextInput,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconAt, IconLogin, IconAlertCircle, IconCheck } from "@tabler/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import apiConfig from "../config/api";
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import usePersistentState from "../hooks/usePersistState";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import store from "store";
import dateformat from "dateformat";

const useStyles = createStyles((theme) => ({
  pointer: {
    cursor: "pointer",
    display: "inline",
  },
  allWidth: {
    width: "100%",
    display: "block",
  },
  backToHomePage: {
    display: "inline",
    marginLeft: "5em",
  },
  inline: {
    display: "inline",
  },
  form: {
    width: "600px !important",
    marginTop: "50px",
  },
}));

export default function SignUp() {
  const userFromLocalStrorage = store.get("user");
  const router = useRouter();
  if (!userFromLocalStrorage) {
    Router.push("/login");
  }
  const { classes } = useStyles();
  const [apiErrors, setApiErrors] = useState(null);
  const [user, setUser] = usePersistentState("user");
  const formRef = useRef();
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { errors, isSubmitting, isValid } = formState;
  const userCountry = userFromLocalStrorage?.country?.name;
  const [userName, setUserName] = useState(userFromLocalStrorage?.name);
  const [userEmail, setUserEmail] = useState(userFromLocalStrorage?.email);
  const [userSurname, setUserSurname] = useState(
    userFromLocalStrorage?.surname
  );
  const userCity = userFromLocalStrorage.city;

  const [userBirthDate, setUserBirthDate] = useState(
    dateformat(userFromLocalStrorage.birthday, "mmm d, yyyy")
  );

  useEffect(() => {
    async function fetchData() {}
    if (userFromLocalStrorage) {
      fetchData();
    }
  }, [userCountry]);

  const [loading, setLoading] = useState(isSubmitting);

  const handleSubmition = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        apiConfig.updateUser(userFromLocalStrorage._id),
        {
          name: data.name,
          surname: data.surname,
          email: data.email,
          country: userCountry,
          city: userCity,
          birthdate: userBirthDate,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": apiConfig.home,
          },
        }
      );
      setLoading(false);
      if (response.status !== 200) {
        setApiErrors(response.data.data);
      } else {
        console.log(response);
        setUser(response.data.user);
        showNotification({
          id: "load-data",
          loading: true,
          title: "We notify you that",
          message: "We are updating your profile ...",
          autoClose: false,
          disallowClose: true,
        });

        setTimeout(() => {
          updateNotification({
            id: "load-data",
            color: "teal",
            title: "We notify you that",
            message: "Your profile was updated successfully",
            icon: <IconCheck size={16} />,
            autoClose: 2500,
            onClose: router.push("/profile"),
          });
        }, 2000);
      }
    } catch (e) {
      setLoading(false);
    }
  });

  return (
    <>
      <Center>
        {" "}
        <Alert icon={<IconAlertCircle size={16} />} title="" color="red">
          <Text size={"lg"} align={"center"}>
            You cannot change your country and city
          </Text>{" "}
        </Alert>
      </Center>
      <Center>
        <form
          method="POST"
          autoComplete="off"
          ref={formRef}
          className={classes.form}
        >
          <Input.Wrapper
            label="Your name"
            required={true}
            placeholder="your name"
            styles={() => ({
              root: {
                marginBottom: "10px",
              },
            })}
          >
            <Input
              autoFocus={true}
              disabled={loading}
              icon={<IconAt />}
              {...register("name", {
                required: true,
                minLength: 4,
              })}
              invalid={errors["name"] ? true : false}
              iconWidth={18}
              variant="filled"
              autoComplete="off"
              size="sm"
              required={+true}
              name="name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type={"text"}
            />
            <Input.Error size="md">
              {errors["name"] ? "invalid name !" : null}
              {apiErrors && apiErrors.includes("name")
                ? "this name is not available, try another one"
                : null}
            </Input.Error>
          </Input.Wrapper>

          <Input.Wrapper
            label="Your surname"
            required={true}
            placeholder="your surname"
            styles={() => ({
              root: {
                marginBottom: "10px",
              },
            })}
          >
            <Input
              autoFocus={true}
              disabled={loading}
              icon={<IconAt />}
              {...register("surname", {
                required: true,
                minLength: 4,
              })}
              invalid={errors["surname"] ? true : false}
              iconWidth={18}
              variant="filled"
              autoComplete="off"
              size="sm"
              required={+true}
              name="surname"
              type={"text"}
              value={userSurname}
              onChange={(e) => {
                setUserSurname(e.target.value);
              }}
            />
            <Input.Error size="md">
              {errors["surname"] ? "invalid surname !" : null}
            </Input.Error>
          </Input.Wrapper>

          <Input.Wrapper
            label="Your email"
            required={true}
            placeholder={userEmail}
            styles={() => ({
              root: {
                marginBottom: "10px",
              },
            })}
          >
            <Input
              autoFocus={true}
              autoComplete={"off"}
              disabled={loading}
              invalid={errors["email"] ? true : false}
              icon={<IconAt />}
              {...register("email", {
                required: true,
                minLength: 6,
                pattern: /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i,
              })}
              iconWidth={18}
              variant="filled"
              size="sm"
              required={+true}
              name="email"
              type={"email"}
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              pattern={/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i}
            />
            <Input.Error size="md">
              {errors["email"] ? "invalid email !" : null}
              {apiErrors && apiErrors.includes("email")
                ? "this email is not available, try another one"
                : null}
            </Input.Error>
          </Input.Wrapper>

          <DatePicker
            style={{
              marginTop: "20px",
            }}
            label={
              <span>
                <span>
                  Your birthdate{" "}
                  <Text color={"orange"} variant="text" size={"sm"}>
                    {" "}
                    {dateformat(userBirthDate, "dddd, mmmm dS, yyyy")}
                  </Text>
                </span>
              </span>
            }
            placeholder="Click here to change your birthdate"
            firstDayOfWeek="sunday"
            dropdownType="modal"
            value={userBirthDate}
            defaultValue={userBirthDate}
            disabled={isSubmitting}
            onChange={setUserBirthDate}
            minDate={dayjs(new Date())
              .startOf("month")
              .subtract(365 * 100, "days")
              .toDate()}
            maxDate={dayjs(new Date())
              .endOf("month")
              .subtract(365 * 10, "days")
              .toDate()}
          />

          <TextInput
            style={{
              marginTop: "20px",
            }}
            label="Your country"
            placeholder={userCountry}
            value={userCountry}
            disabled
          />
          <TextInput
            label="Your city"
            placeholder={userCity}
            value={userCity}
            disabled
          />

          <Button
            variant="default"
            color="blue"
            disabled={!isValid && Object.keys(errors).length > 0}
            type="submit"
            leftIcon={<IconLogin size={18} />}
            loading={loading}
            onClick={handleSubmit(async (data, e) => {
              await handleSubmition(data);
            })}
            styles={() => ({
              root: {
                margin: "20px",
                marginLeft: "0px",
                marginTop: "30px",
              },
            })}
          >
            {" "}
            Update profile
          </Button>
        </form>
      </Center>
    </>
  );
}
