
interface PaymentOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  orderId?: string;
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Add Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = async (options: PaymentOptions, onSuccess: Function, onFailure: Function) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK failed to load. Please check your connection.");
    return;
  }

  // Convert amount to paise for Razorpay (multiply by 100)
  const paise = options.amount * 100;

  // Razorpay options
  const razorpayOptions = {
    key: "rzp_test_YOUR_KEY_ID", // Replace with your actual API key
    amount: paise.toString(),
    currency: options.currency,
    name: options.name,
    description: options.description,
    image: options.image,
    order_id: options.orderId,
    handler: function (response: any) {
      onSuccess(response);
    },
    prefill: options.prefill,
    notes: options.notes,
    theme: options.theme
  };

  try {
    const paymentObject = new window.Razorpay(razorpayOptions);
    paymentObject.open();
  } catch (error) {
    console.error("Error opening Razorpay", error);
    onFailure(error);
  }
};
