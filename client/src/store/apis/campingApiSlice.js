import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const campingApiSlice = createApi({
	reducerPath: 'camping',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	tagTypes: ['Camp'],
	endpoints: (builder) => ({}),
});

export const { useFetchCampingsQuery } = campingApiSlice;
export { campingApiSlice };
