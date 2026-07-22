export const MONEY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    amount
    currencyCode
  }
`;

export const IMAGE_FRAGMENT = `#graphql
  fragment Image on Image {
    url
    altText
    width
    height
  }
`;

export const SEO_FRAGMENT = `#graphql
  fragment Seo on SEO {
    title
    description
  }
`;

export const SELLING_PLAN_FRAGMENT = `#graphql
  fragment SellingPlanFields on SellingPlan {
    id
    name
    description
    options {
      name
      value
    }
    priceAdjustments {
      adjustmentValue {
        __typename
        ... on SellingPlanPercentagePriceAdjustment {
          adjustmentPercentage
        }
        ... on SellingPlanFixedAmountPriceAdjustment {
          adjustmentAmount {
            ...Money
          }
        }
        ... on SellingPlanFixedPriceAdjustment {
          price {
            ...Money
          }
        }
      }
    }
  }
`;

export const VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFields on ProductVariant {
    id
    title
    availableForSale
    currentlyNotInStock
    quantityAvailable
    sku
    selectedOptions {
      name
      value
    }
    price {
      ...Money
    }
    compareAtPrice {
      ...Money
    }
    image {
      ...Image
    }
    sellingPlanAllocations(first: 10) {
      nodes {
        sellingPlan {
          ...SellingPlanFields
        }
        priceAdjustments {
          price {
            ...Money
          }
          compareAtPrice {
            ...Money
          }
        }
      }
    }
  }
`;

export const COFFEE_METAFIELDS = `#graphql
  roastLevel: metafield(namespace: "coffee", key: "roast_level") { value }
  origin: metafield(namespace: "coffee", key: "origin") { value }
  tastingNotes: metafield(namespace: "coffee", key: "tasting_notes") { value }
  processingMethod: metafield(namespace: "coffee", key: "processing_method") { value }
  altitude: metafield(namespace: "coffee", key: "altitude") { value }
  beanType: metafield(namespace: "coffee", key: "bean_type") { value }
  brewMethods: metafield(namespace: "coffee", key: "brew_methods") { value }
  body: metafield(namespace: "coffee", key: "body") { value }
  acidity: metafield(namespace: "coffee", key: "acidity") { value }
  bagSize: metafield(namespace: "coffee", key: "bag_size") { value }
  roastSchedule: metafield(namespace: "coffee", key: "roast_schedule") { value }
  shippingNote: metafield(namespace: "coffee", key: "shipping_note") { value }
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    vendor
    productType
    tags
    updatedAt
    featuredImage {
      ...Image
    }
    images(first: 8) {
      nodes {
        ...Image
      }
    }
    priceRange {
      minVariantPrice { ...Money }
      maxVariantPrice { ...Money }
    }
    compareAtPriceRange {
      minVariantPrice { ...Money }
      maxVariantPrice { ...Money }
    }
    options {
      id
      name
      values
    }
    variants(first: 50) {
      nodes {
        ...ProductVariantFields
      }
    }
    sellingPlanGroups(first: 5) {
      nodes {
        name
        appName
        sellingPlans(first: 10) {
          nodes {
            ...SellingPlanFields
          }
        }
      }
    }
    seo { ...Seo }
    ${COFFEE_METAFIELDS}
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  ${SELLING_PLAN_FRAGMENT}
  ${VARIANT_FRAGMENT}
`;

export const CART_FRAGMENT = `#graphql
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    note
    cost {
      subtotalAmount { ...Money }
      totalAmount { ...Money }
      totalTaxAmount { ...Money }
    }
    discountCodes {
      code
      applicable
    }
    buyerIdentity {
      email
      phone
      countryCode
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        attributes {
          key
          value
        }
        cost {
          totalAmount { ...Money }
          amountPerQuantity { ...Money }
          compareAtAmountPerQuantity { ...Money }
        }
        sellingPlanAllocation {
          sellingPlan {
            ...SellingPlanFields
          }
          priceAdjustments {
            price { ...Money }
            compareAtPrice { ...Money }
          }
        }
        merchandise {
          ... on ProductVariant {
            ...ProductVariantFields
            product {
              id
              handle
              title
              featuredImage { ...Image }
            }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SELLING_PLAN_FRAGMENT}
  ${VARIANT_FRAGMENT}
`;
