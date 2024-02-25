// import { useFetchCampingsQuery } from '../store/apis/campingsApi';
import { useSelector } from 'react-redux';
import { selectCampsIds } from './campingSlice';
import CampingListDetail from './CampingListDetail';
import Skeleton from './Skeleton';
import { useGetCampingsQuery } from './campingSlice';

function Home() {
	const { isLoading, isSuccess, isError, error } = useGetCampingsQuery();
	const orderedCampsIds = useSelector(selectCampsIds);
	let content;

	if (isLoading) {
		content = (
			<Skeleton
				times={3}
				className='h-10 w-full'
			/>
		);
	} else if (isError) {
		content = <div>{error}</div>;
	} else if (isSuccess) {
		content = orderedCampsIds.map((contentId) => (
			<CampingListDetail
				key={contentId}
				campId={contentId}
			/>
		));
	}

	return <> {content}</>;
}

export default Home;
