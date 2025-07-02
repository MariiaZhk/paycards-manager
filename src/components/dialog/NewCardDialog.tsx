import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import type { Card } from "@/common/types";
import { useState, useEffect, useRef } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/Dialog/dialog";

import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button/button";

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
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvc: "",
    },
  });

  const [open, setOpen] = useState(false);
  const cardNumber = watch("cardNumber") || "";
  const brand = getCardBrand(cardNumber.replace(/\s/g, ""));
  const selectedYear = watch("expirationYear");
  const inputRef = useRef<HTMLInputElement>(null);
  const months = getMonths();
  const years = getYears();

  useEffect(() => {
    if (open) {
      reset();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
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

  const currentYearFull = new Date().getFullYear();
  const currentYearShort = currentYearFull.toString().slice(-2);
  const currentMonth = new Date().getMonth() + 1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add New</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm" showCloseButton>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
          </DialogHeader>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Controller
                name="cardNumber"
                control={control}
                rules={{
                  required: "Card number is required",
                  pattern: {
                    value: /^(\d{4} ?){3}\d{4}$/,
                    message: "Invalid card number format",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    onChange={(e) =>
                      field.onChange(formatCardNumber(e.target.value))
                    }
                    value={field.value || ""}
                    className="pr-20"
                    ref={inputRef}
                    autoComplete="cc-number"
                    inputMode="numeric"
                  />
                )}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm text-gray-600 uppercase">
                {cardNumber.trim() ? brand : ""}
                {cardNumber.trim() && brand === "visa" && (
                  <img src="/visa.svg" alt="Visa" className="h-5" />
                )}
                {cardNumber.trim() && brand === "mastercard" && (
                  <img src="/mastercard.svg" alt="Mastercard" className="h-5" />
                )}
                {cardNumber.trim() && brand === "amex" && (
                  <img src="/amex.svg" alt="Amex" className="h-5" />
                )}
              </span>
            </div>
            <p className="text-sm text-red-500 h-5">
              {errors.cardNumber?.message || ""}
            </p>
          </div>

          <div>
            <Label>Expiration Date</Label>
            <div className="flex gap-2">
              <Controller
                name="expirationMonth"
                control={control}
                rules={{ required: "Month is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border rounded px-2 py-1 w-24"
                    aria-invalid={!!errors.expirationMonth}
                    aria-describedby="expiration-error"
                    autoComplete="cc-exp-month"
                  >
                    <option value="">MM</option>
                    {months.map((m) => {
                      const disableMonth =
                        selectedYear === currentYearShort &&
                        Number(m) < currentMonth;
                      return (
                        <option key={m} value={m} disabled={disableMonth}>
                          {m}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
              <Controller
                name="expirationYear"
                control={control}
                rules={{ required: "Year is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border rounded px-2 py-1 w-24"
                    aria-invalid={!!errors.expirationYear}
                    aria-describedby="expiration-error"
                    autoComplete="cc-exp-year"
                  >
                    <option value="">YY</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <p
              id="expiration-error"
              className="text-sm text-red-500 h-5"
              role="alert"
            >
              {errors.expirationMonth?.message ||
                errors.expirationYear?.message ||
                ""}
            </p>
          </div>

          <div>
            <Label htmlFor="cvc">CVC</Label>
            <Controller
              name="cvc"
              control={control}
              rules={{
                required: "CVC is required",
                pattern: {
                  value: /^\d{3}$/,
                  message: "Invalid CVC, must be 3 digits",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="cvc"
                  type="password"
                  placeholder="•••"
                  maxLength={3}
                  onChange={(e) => {
                    const filtered = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 3);
                    field.onChange(filtered);
                  }}
                  value={field.value || ""}
                  autoComplete="cc-csc"
                  inputMode="numeric"
                />
              )}
            />
            <p className="text-sm text-red-500 h-5" role="alert">
              {errors.cvc?.message || ""}
            </p>
          </div>

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
      </DialogContent>
    </Dialog>
  );
};
