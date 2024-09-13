import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "24sevenconcierge.myshopify.com",
  storefrontAccessToken: "10a0b0c482ae8514180b8c051c18ded9",
});

// Fetch Single Product with Metafields
export async function fetchSingleProduct(productId) {
  const response = await fetch(
    "https://24sevenconcierge.myshopify.com/api/2023-01/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "10a0b0c482ae8514180b8c051c18ded9",
      },
      body: JSON.stringify({
        query: `
          query fetchProductWithMetafields($productId: ID!) {
            product(id: $productId) {
              id
              title
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    src
                  }
                }
              }
              metafields(
                identifiers: [
                  {namespace: "custom", key: "capacity"},
                  {namespace: "custom", key: "beds"},
                  {namespace: "custom", key: "bathrooms"},
                  {namespace: "custom", key: "rooms"},
                ]
                ) {
                  key
                  value
              }
            }
          }
        `,
        variables: {
          productId: productId,
        },
      }),
    }
  );

  const jsonResponse = await response.json();

  if (jsonResponse.errors) {
    console.error(
      "Error fetching product with metafields:",
      jsonResponse.errors
    );
    return null;
  }

  const productData = jsonResponse.data.product;
  return productData;
}

export async function fetchAllCollections() {
  const response = await fetch(
    "https://24sevenconcierge.myshopify.com/api/2024-07/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "10a0b0c482ae8514180b8c051c18ded9",
      },
      body: JSON.stringify({
        query: `
          {
            collections(first: 42) {
              edges {
                node {
                  id
                  title
                  image {
                    src
                  }
                  products(first: 1) {
                    edges {
                      node {
                        id
                        
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    }
  );

  const jsonResponse = await response.json();
  const collectionsData = jsonResponse.data.collections.edges
    .map((edge) => edge.node)
    .filter((collection) => collection.products.edges.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

  return collectionsData;
}

export async function fetchProductsWithTags(collectionId) {
  const collection = await client.collection.fetchWithProducts(collectionId, {
    productsFirst: 40,
  });
  return collection.products;
}
export async function fetchProductsFromRealEstateCollection() {
  const response = await fetch(
    "https://24sevenconcierge.myshopify.com/api/2024-07/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "10a0b0c482ae8514180b8c051c18ded9",
      },
      body: JSON.stringify({
        query: `
          query {
            collections(first: 1, query: "title:'Real Estate'") {
              edges {
                node {
                  id
                  title
                  products(first: 100) {
                    edges {
                      node {
                        id
                        title
                        tags
                        priceRange {
                          minVariantPrice {
                            amount
                            currencyCode
                          }
                        }
                        images(first: 1) {
                          edges {
                            node {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    }
  );

  const jsonResponse = await response.json();

  if (jsonResponse.errors) {
    console.error(
      "Error fetching products from Real Estate collection:",
      jsonResponse.errors
    );
    return null;
  }

  const collection = jsonResponse.data.collections.edges[0]?.node;

  if (!collection) {
    console.error("No collection titled 'Real Estate' found.");
    return null;
  }
  const returnValue = {
    collectionId: collection.id,
    products: collection.products.edges.map((edge) => edge.node),
  };
  return returnValue;
}
