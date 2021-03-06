/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { esFilters } from '../../../../../../../../src/plugins/data/public';

export const createFilter = (
  key: string,
  value: string[] | string | null | undefined
): esFilters.Filter => {
  const queryValue = value != null ? (Array.isArray(value) ? value[0] : value) : null;
  return queryValue != null
    ? {
        meta: {
          alias: null,
          negate: false,
          disabled: false,
          type: 'phrase',
          key,
          value: queryValue,
          params: {
            query: queryValue,
          },
        },
        query: {
          match: {
            [key]: {
              query: queryValue,
              type: 'phrase',
            },
          },
        },
      }
    : ({
        exists: {
          field: key,
        },
        meta: {
          alias: null,
          disabled: false,
          key,
          negate: value === undefined,
          type: 'exists',
          value: 'exists',
        },
      } as esFilters.Filter);
};
