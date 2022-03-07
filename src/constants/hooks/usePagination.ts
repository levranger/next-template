import { set, get } from 'lodash';
import { QueryHookOptions, useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';

function usePaginationQuery(
  query: DocumentNode,
  options: QueryHookOptions<any, Record<string, any>>,
  path: string,
): any {
  const { ...queryOptions } = options;

  const { data = {}, fetchMore, ...restProps } = useQuery(query, queryOptions);

  const field = get(data, path);
  if (field?.cursors) {
    field.hasNext = field.cursors.hasNext || false;
    field.hasPrevious = field.cursors.hasPrevious || false;
    field.loadAfter = (rewrite) =>
      fetchMore({
        variables: {
          paging: {
            after: field.cursors.after,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (rewrite) return fetchMoreResult;
          const newData = { ...prev, ...fetchMoreResult };
          const newField = get(fetchMoreResult, path);
          set(newData, path, {
            items: [...field.items, ...newField.items],
            cursors: {
              ...newField.cursors,
            },
            __typename: newField.__typename,
          });
          return newData;
        },
      });

    field.loadBefore = (rewrite) =>
      fetchMore({
        variables: {
          cursor: { before: field.cursors.before },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (rewrite) return fetchMoreResult;
          const newData = { ...prev, ...fetchMoreResult };
          const newField = get(fetchMoreResult, path);

          set(newData, path, {
            items: [...newField.item, ...field.items],
            cursors: {
              ...newField.cursors,
            },
            __typename: newField.__typename,
          });
          return newData;
        },
      });
  }

  return {
    ...restProps,
    data,
    fetchMore,
  };
}

export default usePaginationQuery;
