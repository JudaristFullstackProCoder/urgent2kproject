import { Input, Button, createStyles, Select } from "@mantine/core";
import { IconAt, IconFingerprint, IconLogin } from "@tabler/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import apiConfig from "../config/api";
import { useForm } from "react-hook-form";
import Router from "next/router";
import usePersistentState from "../hooks/usePersistState";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import store from "store";

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
  },
}));

export default function SignUp() {
  const userFromLocalStrorage = store.get("user");
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
  const [countriesData, setCountriesData] = useState([
    {
      item: "",
      label: "",
    },
  ]);
  const [citiesData, setCitiesData] = useState([]);
  const [userCountry, setUserCountry] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userBirthDate, setUserBirthDate] = useState();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const countries = await (await axios.get(apiConfig.getCountries)).data;
      const continents = await (await axios.get(apiConfig.getContinents)).data;
      const cities = await (
        await axios.get(
          apiConfig.getCitiesOfaCountry(countries[userCountry]?.name ?? "")
        )
      ).data;
      // ...
      let tab = [];
      for (const countryKey in countries) {
        tab.push({
          value: countryKey,
          label: countries[countryKey].name,
          group: continents[countries[countryKey].continent],
        });
      }
      setCountriesData(tab);
      setCitiesData(cities.cities);
    }
    if (userFromLocalStrorage) {
      fetchData();
    }
    // Each time user country change we reset user city
    setUserCity(null);
  }, [userCountry]); // Or [] if effect doesn't need props or state

  const [loading, setLoading] = useState(isSubmitting);
  const handleSubmition = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiConfig.userSignUp,
        {
          name: data.name,
          surname: data.surname,
          password: data.password,
          email: data.email,
          country: userCountry,
          city: userCity,
          birthday: userBirthDate,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": apiConfig.home,
          },
        }
      );
      setLoading(false);
      if (response.status !== 201) {
        // there was an error
        setApiErrors(response.data.data);
      } else {
        setUser(response.data);
        await Router.push("/");
      }
    } catch (e) {
      setLoading(false);
    }
  });

  return (
    <form
      method="POST"
      autoComplete="off"
      ref={formRef}
      className={classes.form}
    >
      <Input.Wrapper
        label="name"
        description="Please type your name here !"
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
        label="surname"
        description="Please type your name here !"
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
        />
        <Input.Error size="md">
          {errors["surname"] ? "invalid surname !" : null}
        </Input.Error>
      </Input.Wrapper>

      <Input.Wrapper
        label="Email"
        description="Please type your email here !"
        required={true}
        placeholder="youremail@gmail.com"
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
            pattern: /^\S+@\S+$/,
          })}
          iconWidth={18}
          variant="filled"
          size="sm"
          required={+true}
          name="email"
          type={"email"}
          pattern={/^\S+@\S+$/}
        />
        <Input.Error size="md">
          {errors["email"] ? "invalid email !" : null}
          {apiErrors && apiErrors.includes("email")
            ? "this email is not available, try another one"
            : null}
        </Input.Error>
      </Input.Wrapper>

      <DatePicker
        label="Pick your birthday"
        placeholder="Pick date"
        firstDayOfWeek="sunday"
        dropdownType="modal"
        error={userBirthDate ? null : "chose a date"}
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

      <Select
        label="Choose your country"
        placeholder="Pick one country"
        searchable
        value={userCountry}
        onChange={setUserCountry}
        error={userCountry ? null : "Field is required"}
        withAsterisk
        allowDeselect
        dropdownComponent="div"
        data={countriesData}
        disabled={isSubmitting}
      />

      <Select
        label="Choose your city"
        placeholder="Pick one city"
        searchable
        value={userCity}
        dropdownComponent="div"
        onChange={setUserCity}
        error={userCity ? null : "Field is required"}
        withAsterisk
        data={citiesData}
        allowDeselect
        disabled={isSubmitting}
      />
      <Input.Wrapper
        label="Password"
        description="Please type your password here !"
        required={true}
        styles={() => ({
          root: {
            marginBottom: "10px",
          },
        })}
      >
        <Input
          disabled={loading}
          icon={<IconFingerprint />}
          iconWidth={18}
          variant="filled"
          type={"password"}
          size="sm"
          invalid={errors["password"] ? true : false}
          required={+true}
          name="password"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 50,
          })}
        />
        <Input.Error size="md">
          {errors["password"] ? "invalid password !" : null}
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
  );
}