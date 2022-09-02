import { Button, Divider, Group, Input, Modal, Select } from "@mantine/core";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import store from "store";
import { IconNumber, IconLogin } from "@tabler/icons";
import apiConfig from "../config/api";

export default function SendMoneyTransaction({ open, setOpen, userModal }) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { errors, isSubmitting, isValid } = formState;
  const [loading, setLoading] = useState(isSubmitting);
  const [amount, setAmount] = useState(0);
  const [cur, setCur] = useState(store.get("user").country.currency);
  const formRef = useRef();

  const handleSubmition = useCallback(async (data) => {
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

      const sender = await (
        await axios.get(apiConfig.getUserById(store.get("user")._id))
      ).data;
      console.log(sender);
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
        setApiErrors(response.data.data);
      } else {
        setUser(response.data);
        Router.push("/");
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
            invalid={errors["amount"] ? true : false}
            disabled={loading}
            icon={<IconNumber />}
            {...register("amount", {
              required: true,
              min: 1,
            })}
            iconWidth={18}
            autoComplete="off"
            size="md"
            onChange={(v) => {
              setAmount(v.target.value);
            }}
            required={true}
            name="amount"
            type="number"
          />
          <Input.Error size="md">
            {errors["amount"] ? "invalid amount !" : null}
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
          type="submit"
          leftIcon={<IconLogin size={18} />}
          loading={loading}
          onClick={handleSubmit(async (data, e) => {
            console.log(e);
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
          onClick={setOpen}
        >
          Cancel
        </Button>
      </Group>
    </Modal>
  );
}
