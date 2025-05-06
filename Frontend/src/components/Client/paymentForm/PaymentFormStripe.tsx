/* eslint-disable @typescript-eslint/no-explicit-any */

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "../../ui/button";
import { toast } from "react-toastify";

export interface PaymentFormProps {
  amount: number;
  metadata?: Record<string, string>;
  onCreatePaymentIntent: (paymentMethodId: string) => Promise<{
    clientSecret: string;
    payload: any;
  }>;
  onConfirmSuccess: (payload: any, paymentIntentId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  metadata,
  onCreatePaymentIntent,
  onConfirmSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    setPaymentStatus("Processing...");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Stripe error:", error);
      setPaymentStatus("Payment Failed");
      toast.error("Payment failed. Please check your card details.");
    } else {
      try {
        const { clientSecret, payload } = await onCreatePaymentIntent(paymentMethod.id);
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (confirmError) {
          console.error("Payment confirmation error:", confirmError.message);
          setPaymentStatus("Payment Failed");
          toast.error("Payment confirmation failed.");
        } else if (paymentIntent?.status === "succeeded") {
          setPaymentStatus("Payment Successful");
          onConfirmSuccess(payload, paymentIntent.id);
          toast.success("Payment successful!");
        }
      } catch (err) {
        console.error("Error during payment:", err);
        setPaymentStatus("Payment Failed");
        toast.error(err instanceof Error ? err.message : "Something went wrong during payment.");
      }
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        iconColor: "#666ee8",
        color: "#31325F",
        lineHeight: "40px",
        fontWeight: 300,
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        "::placeholder": {
          color: "#CFD7E0",
        },
      },
      invalid: {
        iconColor: "#e25950",
        color: "#e25950",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-xl border shadow-lg w-full max-w-md mx-auto bg-white">
      <CardElement options={cardElementOptions} className="border p-2 rounded-md" />
      <div className="text-lg font-medium">Total: ₹{amount}</div>

      {paymentStatus && (
        <div className="text-center text-xl font-bold">
          {paymentStatus === "Processing..."
            ? "Processing payment... Please wait."
            : paymentStatus === "Payment Successful"
              ? "Payment Successful! 🎉"
              : "Payment Failed. Please try again."}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-gray-900 rounded-full" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
