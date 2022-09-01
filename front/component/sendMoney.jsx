import { Button, Divider, Group, Input, Modal, Text } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import apiEndpoints from "../config/api";
import store from "store";
import { IconNumber, IconLogin } from "@tabler/icons";

export default function SendMoneyTransaction({ open, userId, setOpen }) {
  useEffect(() => {
    async function fetchData() {
      const response = await (
        await axios.get(apiEndpoints.getUserById(userId ?? "..."))
      ).data;
      if (!response.status) {
        setUser(response);
      }
    }
    fetchData();
  }, []);

  const [user, setUser] = useState({
    country: {
      name: "",
    },
    city: "",
    name: "",
    surname: "",
  });
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { errors, isSubmitting, isValid } = formState;
  const [loading, setLoading] = useState(isSubmitting);
  const formRef = useRef();

  const handleSubmition = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiConfig.userSignUp,
        {
          sender: store.get("user")._id,
          receiver: user._id,
          amount: data.amount,
          from: store.get("user").country.currency,
          to: user.country.currency,
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
    <Modal
      opened={open}
      overlayColor={"white"}
      overlayOpacity={0}
      zIndex={1000}
      withCloseButton={true}
      lockScroll
      closeOnClickOutside={true}
      closeOnEscape={true}
      onClose={() => setOpen(!open)}
    >
      <form action="post" ref={formRef} autoComplete="off">
        <Input.Wrapper
          label="amount"
          description="Enetr the amount to send"
          required={true}
          placeholder="3000"
        >
          <Input
            autoFocus={true}
            disabled={loading}
            icon={<IconNumber />}
            {...register("amount", {
              required: true,
              min: 1,
              minLength: 1,
            })}
            invalid={errors["amount"] ? true : false}
            iconWidth={18}
            variant="filled"
            autoComplete="off"
            size="md"
            required={+true}
            name="amount"
            type={"number"}
          />
          <Input.Error size="md">
            {errors["amount"] ? "invalid amount !" : null}
          </Input.Error>
        </Input.Wrapper>
      </form>
      <Divider my="sm" />
      <Text>
        Vous Allez envoyer {""} a {user?.name} {user?.surname} habitant{" "}
        {user?.country?.name} {user?.city} ? Cliquez sour envoyer pour continuer
        la transaction ou annuler pour arrêter la transaction
      </Text>
      <br />
      <Group>
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
        >
          {" "}
          Send
        </Button>

        <Button
          variant="default"
          color="blue"
          disabled={!isValid}
          type="submit"
          leftIcon={<IconLogin size={18} />}
          loading={loading}
          onClick={handleSubmit(async (data) => {
            await handleSubmition(data);
          })}
        >
          {" "}
          Cancel
        </Button>
      </Group>
    </Modal>
  );
}
