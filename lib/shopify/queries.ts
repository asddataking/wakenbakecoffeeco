import {
  CART_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from "./fragments";

export const GET_SHOP = `#graphql
  query GetShop {
    shop {
      name
      description
      primaryDomain { url }
      brand {
        logo {
          image { url altText }
        }
      }
    }
  }
`;

export const GET_MENU = `#graphql
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;

export const GET_PRODUCTS = `#graphql
  query GetProducts($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const GET_PRODUCT_BY_HANDLE = `#graphql
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductCard
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const GET_PRODUCT_RECOMMENDATIONS = `#graphql
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductCard
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const GET_COLLECTIONS = `#graphql
  query GetCollections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
        description
        descriptionHtml
        image { url altText width height }
        seo { title description }
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `#graphql
  query GetCollectionByHandle($handle: String!, $first: Int!, $after: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $filters: [ProductFilter!]) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      image { url altText width height }
      seo { title description }
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          ...ProductCard
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const GET_CART = `#graphql
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;
