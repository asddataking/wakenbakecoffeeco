export type FaqItem = {
  question: string;
  answer: string;
};

export const siteFaq: FaqItem[] = [
  {
    question: "Does the coffee contain cannabis or THC?",
    answer:
      "Nope. Wake N’ Bake Coffee Co. sells coffee. The name is part of our laid-back lifestyle and DankNDevour roots, but the coffee itself does not contain cannabis or THC unless a future product explicitly states otherwise.",
  },
  {
    question: "Where is checkout handled?",
    answer:
      "All payments and checkout happen on Shopify-hosted checkout. We never process card data on this storefront.",
  },
  {
    question: "Who ships the coffee?",
    answer:
      "Fulfillment is managed through Shopify with Dripshipper partners. Timing shown on product pages comes from live Shopify data when available. [CONFIRM SHIPPING WINDOW]",
  },
  {
    question: "Do you offer subscriptions?",
    answer:
      "When selling plans are configured in Shopify, they appear on product pages as Keep It Coming options. Available plans and savings vary by roast. You can manage or cancel through your Shopify customer account after checkout. [CONFIRM SUBSCRIPTION CANCELLATION TERMS]",
  },
  {
    question: "What is your return policy?",
    answer:
      "[CONFIRM RETURN POLICY] Until the final policy is published, contact us with your order details and we will help from there.",
  },
  {
    question: "How do accounts work?",
    answer:
      "Customer accounts are powered by Shopify. If account login is configured, you will see an account link in the header.",
  },
  {
    question: "Where can I learn to brew?",
    answer:
      "Visit our Brew Guides for drip coffee, French press, pour-over, camping, and more. The Coffee Journal has deeper coffee basics too.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Send a message through our Contact page or email [CONFIRM SUPPORT EMAIL]. We read every note — questions, wholesale ideas, and wonderfully random messages included.",
  },
];

export const productFaq: FaqItem[] = [
  {
    question: "Does this coffee contain cannabis or THC?",
    answer:
      "No. This is coffee. Wake N’ Bake Coffee Co. does not include cannabis or THC in the coffee unless a future product explicitly says otherwise.",
  },
  {
    question: "How fresh is the coffee?",
    answer:
      "Roast and ship timing come from our Shopify and Dripshipper catalog. Check each product’s shipping note when available. [CONFIRM ROASTING AND FULFILLMENT LANGUAGE WITH DRIPSHIPPER]",
  },
  {
    question: "Whole bean or ground?",
    answer:
      "Choose grind on the product variants when offered. Whole bean usually stays freshest longest.",
  },
  {
    question: "Can I subscribe?",
    answer:
      "If a Keep It Coming option appears above, you can subscribe through Shopify. Otherwise Just This Bag is available as a one-time purchase.",
  },
];
