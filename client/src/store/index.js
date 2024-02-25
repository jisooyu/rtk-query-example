import { configureStore } from '@reduxjs/toolkit';
import { campingApiSlice } from './apis/campingApiSlice';

export const store = configureStore({
	reducer: {
		[campingApiSlice.reducerPath]: campingApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(campingApiSlice.middleware);
	},
});

export { useFetchCampingsQuery } from './apis/campingApiSlice';
