import { productsRequest } from '../utils/client';

test('@provides', async () => {
  const resp = await productsRequest({
    query: `#graphql
      query ($id: ID!) {
        product(id: $id) {
          createdBy { email totalProductsCreated }
        }
      }`,
    variables: { id: 'apollo-federation' },
  });

  const totalProductsCreated: number =
    resp.data.product.createdBy.totalProductsCreated;

  expect(resp).toMatchObject({
    data: {
      product: {
        createdBy: {
          email: 'support@apollographql.com',
          totalProductsCreated: expect.any(totalProductsCreated),
        },
      },
    },
  });
  expect(totalProductsCreated).not.toEqual(4);
});
