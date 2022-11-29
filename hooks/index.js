import { request } from "graphql-request";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

/**
 * Make authenticated GraphQL query request
 * @param {string} query GraphQL query or mutation
 * @param {Object} variables GraphQL Document variables
 * @param {boolean} blockRequest Request blocked if true
 * @returns useSWR object (data, error, isValidating, mutate)
 */
 export const useQuery = (query, variables, blockRequest) => {
  if (!query) {
    throw Error("No query provided to `useQuery`");
  }

  const { getToken } = useAuth();
  const endpoint = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;
  const fetcher = async () => {
      return request(endpoint, query, variables, {
          'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET,
          'content-type': 'application/json',
          authorization: `Bearer ${await getToken({template: "hasura"})}`
      });
  };

  return useSWR(query, blockRequest ? () => {} : fetcher);
};

export const useScoreQuery = () => {
  return useQuery(
    `
      query MyQuery {
        scoreboard {
          count
          user_id
        }
      }
    `,
    null,
    false
  )
}

export const useCountMutation = (count, data) => {
  const prevCount = data?.scoreboard[0]?.count ?? 0
  const blockRequest = count < 1 || prevCount === count
  return useQuery(
    `mutation {
      insert_scoreboard_one(
        object: { count: ${count} }, 
        on_conflict: { constraint: scoreboard_pkey, update_columns: count }
      ) 
      {
        count
      }
    }`,
    null,
    blockRequest,
  )
}
