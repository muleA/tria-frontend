import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../../shared/axios-base-query';

export const apiSlice = createApi({
  tagTypes: ['services', 'service-fee', 'processing-time'],
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
