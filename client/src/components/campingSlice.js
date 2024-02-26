import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { campingApiSlice } from '../store/apis/campingApiSlice';

const campingAdapter = createEntityAdapter({
	// customizing the selectId
	selectId: (camp) => camp.contentId,
	sortComparer: (a, b) => b.facltNm.localeCompare(a.facltNm),
});

const initialState = campingAdapter.getInitialState();

export const extendedApiSlice = campingApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCampings: builder.query({
			query: () => '/camps',
			transformResponse: (responseData) => {
				try {
					return campingAdapter.setAll(initialState, responseData);
				} catch (error) {
					console.error('Error transforming response data:', error);
					return initialState;
				}
			},
			providesTags: (result, error, arg) => {
				try {
					const tags = [
						{ type: 'Camp', id: 'LIST' },
						...(result.ids
							? result.ids.map((id) => ({
									type: 'Camp',
									id: arg?.contentId ?? id,
							  }))
							: []),
					];
					return tags;
				} catch (error) {
					console.error('Error generating tags:', error);
					return [];
				}
			},
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
