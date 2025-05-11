"use client";

import CInputText from "@/components/form/CInputText";
import CInputTextArea from "@/components/form/CInputTextArea";
import FormLayout from "@/components/form/FormLayout";
import { Form } from "@/components/ui/form";
import { handleTRPCClientError } from "@/lib/error";
import { showSuccess } from "@/lib/toaster";
import {
  transactionCreateSchema,
  type TTransactionCreateSchema,
} from "@/schema/finance.schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const AddFinanceForm = () => {
  const form = useForm<TTransactionCreateSchema>({
    resolver: zodResolver(transactionCreateSchema),
    defaultValues: {
      amount: 0,
      purpose: "",
    },
  });
  const createTransaction = api.finance.createTransaction.useMutation({
    onSuccess: () => {
      showSuccess("add transaction success");
      window.location.href = "/finance";
    },
    onError: (error) => {
      handleTRPCClientError(error.data, form);
    },
  });

  const onSubmit: SubmitHandler<TTransactionCreateSchema> = (payload) => {
    createTransaction.mutate({
      ...payload,
      amount: Number(payload.amount),
    });
  };

  return (
    <Form {...form}>
      <FormLayout
        title="Add Transaction"
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={createTransaction.isPending}
        cancelRoute="/finance"
      >
        <CInputText
          form={form}
          label="Amount"
          type="tel"
          name="amount"
          placeholder="amount"
        />
        <CInputTextArea
          form={form}
          label="Purpose"
          name="purpose"
          placeholder="purpose"
        />
      </FormLayout>
    </Form>
  );
};

export default AddFinanceForm;
