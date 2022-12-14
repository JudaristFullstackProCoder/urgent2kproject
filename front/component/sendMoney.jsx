import { Button, Divider, Group, Input, Modal, Select } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import store from "store";
import { IconNumber, IconLogin } from "@tabler/icons";
import apiConfig from "../config/api";
import Router, { useRouter } from "next/router";

export default function SendMoneyTransaction({
  open,
  setOpen,
  userModal,
  closeModal,
}) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const [SENDER, SET_SENDER] = useState({});
  const userFromLocalStrorage = store.get("user");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const s = await (
        await axios.get(apiConfig.getUserById(userFromLocalStrorage._id))
      ).data;
      SET_SENDER(s);
    }
    fetchData();
  }, []);
  const { errors, isSubmitting } = formState;
  const [loading, setLoading] = useState(isSubmitting);
  const [amount, setAmount] = useState(1);
  const [cur, setCur] = useState(userFromLocalStrorage.country.currency);
  const formRef = useRef();

  const handleSubmition = useCallback(async (data) => {
    //*
    showNotification({
      title: "Transaction processing ...",
      message: "Your transaction is in progress",
      closeButtonProps: true,
      color: "blue",
      loading,
    });
    //*

    const sender = await (
      await axios.get(apiConfig.getUserById(userFromLocalStrorage._id))
    ).data;

    setLoading(true);
    try {
      const response = await (
        await axios.post(
          apiConfig.createTransaction,
          {
            sender: userFromLocalStrorage._id,
            receiver: userModal._id,
            amount: data.amount,
            from: cur,
            to: userModal.country.currency,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": apiConfig.home,
            },
          }
        )
      ).data;
      const apikey = "96G6OG5FA0nlqGFt2VaM0J7E5DssmpCJ";
      const toDebit = await (
        await axios.get(
          `https://api.apilayer.com/exchangerates_data/convert?to=${
            store.get("user").country.currency.includes("USD,USN")
              ? "USD"
              : store.get("user").country.currency
          }&from=${cur.includes("USD,USN") ? "USD" : cur}&amount=${amount}`,
          {
            headers: {
              apikey: apikey,
            },
          }
        )
      ).data;
      const toAdd = await (
        await axios.get(
          `https://api.apilayer.com/exchangerates_data/convert?to=${
            userModal.country.currency.includes("USD,USN")
              ? "USD"
              : userModal.country.currency
          }&from=${cur.includes("USD,USN") ? "USD" : cur}&amount=${amount}`,
          {
            headers: {
              apikey: apikey,
            },
          }
        )
      ).data;

      const r = await (
        await axios.patch(apiConfig.updateUser(userFromLocalStrorage._id), {
          amount: sender.amount - toDebit.result,
          sent:
            toDebit.result +
            (
              await axios.get(apiConfig.getUserById(userFromLocalStrorage._id))
            ).data.sent,
        })
      ).data;

      const r2 = await (
        await axios.patch(apiConfig.updateUser(userModal._id), {
          amount: userModal.amount + toAdd.result,
          received: userModal.received + toAdd.result,
        })
      ).data;

      setLoading(false);

      if (response.status) {
        // there was an error
        showNotification({
          title: "Transaction failed",
          message:
            "A problem occurred while processing the transaction try again later.",
          closeButtonProps: true,
          color: "red",
          autoClose: 5000,
        });
        setApiErrors(response.data.data);
      } else {
        showNotification({
          title: "Transaction",
          message: "Transaction completed successfully",
          closeButtonProps: true,
          color: "green",
          autoClose: 5000,
        });
        closeModal();
        router.reload();
        Router.push("/");
      }
    } catch (e) {
      setLoading(false);
      showNotification({
        title: "Transaction failed",
        message:
          "A problem occurred while processing the transaction try again later.",
        closeButtonProps: true,
        color: "red",
        autoClose: 5000,
      });
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
            invalid={errors["amount"] ? true : false}
            disabled={loading}
            icon={<IconNumber />}
            {...register("amount", {
              required: true,
              min: 1,
              max: SENDER.amount,
            })}
            iconWidth={18}
            autoComplete="off"
            size="md"
            onChange={(v) => {
              setAmount(v.target.value);
            }}
            value={amount}
            required={true}
            name="amount"
            type="number"
          />
          <Input.Error size="lg">
            {amount > SENDER.amount
              ? "your account balance is insufficient. your balance is " +
                SENDER.amount +
                " " +
                SENDER.country.currency
              : null}
          </Input.Error>
        </Input.Wrapper>

        <Select
          label="Choose currency"
          placeholder="Pick one"
          clearable={false}
          required={true}
          name="from"
          value={cur}
          invalid={errors["from"] ? true : false}
          onChange={(v) => {
            setCur(v);
          }}
          nothingFound="No options"
          data={
            userModal.country.currency === store.get("user").country.currency
              ? [store.get("user").country.currency]
              : [userModal.country.currency, store.get("user").country.currency]
          }
        />
      </form>
      <Divider my="sm" />
      Are you going to send{" "}
      <strong>
        {" " + amount} {"  " + cur}
      </strong>{" "}
      to <strong>{" " + userModal.name}</strong>
      <strong>{" " + userModal?.surname + " "}</strong>
      pays: <strong>{" " + userModal?.country?.name}</strong> ville:{" "}
      <strong>{" " + userModal?.city}</strong>? Click <strong>send</strong> to
      continue the transaction or <strong>cancel</strong> to stop the
      transaction
      <br />
      <Divider my={"sm"} />
      <Group>
        <Button
          variant="default"
          color="blue"
          disabled={amount > SENDER.amount || amount < 1}
          type="submit"
          leftIcon={<IconLogin size={18} />}
          loading={loading}
          onClick={handleSubmit(async (data) => {
            await handleSubmition(data);
          })}
        >
          Send
        </Button>

        <Button
          variant="default"
          color="blue"
          type="submit"
          leftIcon={<IconLogin size={18} />}
          loading={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
      </Group>
    </Modal>
  );
}
