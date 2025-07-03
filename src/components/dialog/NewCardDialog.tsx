import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import type { Card } from "@/common/types";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form/form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  formatCardNumber,
  getCardBrand,
  getMonths,
  getYears,
  isExpirationDateValid,
} from "@/common/utils";

type FormValues = {
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvc: string;
};

interface Props {
  onAdd: (card: Card) => void;
}

export const NewCardDialog = ({ onAdd }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvc: "",
    },
  });

  const { handleSubmit, watch, reset, setError, clearErrors, control } = form;

  const cardNumber = watch("cardNumber") || "";
  const selectedYear = watch("expirationYear");
  const brand = getCardBrand(cardNumber.replace(/\s/g, ""));
  const inputRef = useRef<HTMLInputElement>(null);

  const months = getMonths();
  const years = getYears();

  const currentYearFull = new Date().getFullYear();
  const currentYearShort = currentYearFull.toString().slice(-2);
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: FormValues) => {
    const expMonth = Number(data.expirationMonth);
    const expYear = Number("20" + data.expirationYear);

    if (!isExpirationDateValid(expMonth, expYear)) {
      setError("expirationMonth", {
        message: "Expiration date cannot be in the past",
      });
      setError("expirationYear", {
        message: "Expiration date cannot be in the past",
      });
      return;
    } else {
      clearErrors(["expirationMonth", "expirationYear"]);
    }

    onAdd({
      id: uuidv4(),
      brand,
      last4: data.cardNumber.replace(/\s/g, "").slice(-4),
      isDefault: false,
      expirationDate: `${data.expirationMonth} / ${data.expirationYear}`,
    });

    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add New</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm" showCloseButton>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <DialogHeader>
              <DialogTitle>Add New Card</DialogTitle>
            </DialogHeader>

            <FormField
              control={control}
              name="cardNumber"
              rules={{
                required: "Card number is required",
                pattern: {
                  value: /^(\d{4} ?){3}\d{4}$/,
                  message: "Invalid card number format",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        ref={inputRef}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        onChange={(e) =>
                          field.onChange(formatCardNumber(e.target.value))
                        }
                        value={field.value || ""}
                        autoComplete="cc-number"
                        inputMode="numeric"
                        className="pr-20"
                      />
                    </FormControl>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm text-gray-600 uppercase">
                      {cardNumber.trim() && brand ? brand : ""}
                      {cardNumber.trim() && brand === "visa" && (
                        <img src="/visa.svg" alt="Visa" className="h-5" />
                      )}
                      {cardNumber.trim() && brand === "mastercard" && (
                        <img
                          src="/mastercard.svg"
                          alt="Mastercard"
                          className="h-5"
                        />
                      )}
                      {cardNumber.trim() && brand === "amex" && (
                        <img src="/amex.svg" alt="Amex" className="h-5" />
                      )}
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel>Expiration Date</FormLabel>
            <div className="flex gap-2">
              <FormField
                control={control}
                name="expirationMonth"
                rules={{ required: "Required" }}
                render={({ field, fieldState }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={false}
                        aria-label="Select expiration month"
                      >
                        <SelectTrigger size="sm">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((m) => {
                            const disabled =
                              selectedYear === currentYearShort &&
                              Number(m) < currentMonth;
                            return (
                              <SelectItem key={m} value={m} disabled={disabled}>
                                {m}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="expirationYear"
                rules={{ required: "Required" }}
                render={({ field, fieldState }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        aria-label="Select expiration year"
                      >
                        <SelectTrigger size="sm">
                          <SelectValue placeholder="YY" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y) => (
                            <SelectItem key={y} value={y}>
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="cvc"
              rules={{
                required: "CVC is required",
                minLength: {
                  value: 3,
                  message: "CVC must be at least 3 digits",
                },
                maxLength: {
                  value: 4,
                  message: "CVC can't be more than 4 digits",
                },
                pattern: { value: /^\d+$/, message: "CVC must be numeric" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={4}
                      placeholder="••••"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="default" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="default" type="submit">
                Add Card
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
