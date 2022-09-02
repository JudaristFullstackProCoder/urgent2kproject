import { Button, Divider, Group, Input, Modal, Select } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import store from "store";
import { IconNumber, IconLogin } from "@tabler/icons";
import apiConfig from "../config/api";

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
  useEffect(() => {
    async function fetchData() {
      const s = await (
        await axios.get(apiConfig.getUserById(store.get("user")._id))
      ).data;
      SET_SENDER(s);
    }
    fetchData();
  }, []);
  const { errors, isSubmitting } = formState;
  const [loading, setLoading] = useState(isSubmitting);
  const [amount, setAmount] = useState(0);
  const [cur, setCur] = useState(store.get("user").country.currency);
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
      await axios.get(apiConfig.getUserById(store.get("user")._id))
    ).data;

    setLoading(true);
    try {
      const response = await (
        await axios.post(
          apiConfig.createTransaction,
          {
            sender: store.get("user")._id,
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
            store.get("user").country.currency
          }&from=${cur}&amount=${amount}`,
          {
            headers: {
              apikey: apikey,
            },
          }
        )
      ).data;
      const toAdd = await (
        await axios.get(
          `https://api.apilayer.com/exchangerates_data/convert?to=${userModal.country.currency}&from=${cur}&amount=${amount}`,
          {
            headers: {
              apikey: apikey,
            },
          }
        )
      ).data;

      const r = await (
        await axios.patch(apiConfig.updateUser(store.get("user")._id), {
          amount: sender.amount - toDebit.result,
        })
      ).data;

      const r2 = await (
        await axios.patch(apiConfig.updateUser(userModal._id), {
          amount: userModal.amount + toAdd.result,
        })
      ).data;

      console.log(toDebit, toAdd, response, r, r2, sender);
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
      Vous Allez envoyer{" "}
      <strong>
        {" " + amount} {"  " + cur}
      </strong>{" "}
      a <strong>{" " + userModal.name}</strong>
      <strong>{" " + userModal?.surname + " "}</strong>
      pays: <strong>{" " + userModal?.country?.name}</strong> ville:{" "}
      <strong>{" " + userModal?.city}</strong>
      ? Cliquez sur envoyer pour continuer la transaction ou annuler pour
      arrêter la transaction
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
