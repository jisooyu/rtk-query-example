import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { campingApiSlice } from '../store/apis/campingApiSlice';

const campingAdapter = createEntityAdapter({
	// customizing the selectId
	selectId: (camp) => camp.contentId,
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = campingAdapter.getInitialState();

export const extendedApiSlice = campingApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCampings: builder.query({
			query: () => '/camps',
			transformResponse: (responseData) => {
				let min = 1;
				const loadedCamps = responseData.map((camp) => {
					if (!camp?.date)
						camp.date = sub(new Date(), { minutes: min++ }).toISOString();
					return camp;
				});
				return campingAdapter.setAll(initialState, loadedCamps);
			},
			providesTags: (result, error, arg) => [
				{ type: 'Camp', id: 'LIST' },
				...result.ids.map((id) => ({ type: 'Camp', id: arg?.contentId ?? id })),
			],
		}),
	}),
});

export const { useGetCampingsQuery } = extendedApiSlice;

// returns the query result object
export const selectCampsResult =
	extendedApiSlice.endpoints.getCampings.select();
// creates memoized selector
const selectCampsData = createSelector(
	selectCampsResult,
	(campsResult) => campsResult.data
);

export const {
	selectAll: selectAllCamps,
	selectById: selectCampsById,
	selectIds: selectCampsIds,
} = campingAdapter.getSelectors(
	(state) => selectCampsData(state) ?? initialState
);
