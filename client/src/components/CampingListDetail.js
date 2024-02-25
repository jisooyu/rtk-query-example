import { useState } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { selectCampsById } from './campingSlice';
import { useSelector } from 'react-redux';

const CampingListDetail = ({ campId }) => {
	const camp = useSelector((state) => selectCampsById(state, campId));
	const [isExpanded, setIsExapnded] = useState(false);

	let slectiveRendering = isExpanded ? (
		<div>
			<img
				loading='lazy'
				src={camp.firstImageUrl || 'no-image-available.jpeg'}
				alt='campingPicture'
			/>
			<GoChevronUp />
		</div>
	) : (
		<div>
			<GoChevronDown />
		</div>
	);

	return (
		<div
			className='flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer'
			onClick={() => setIsExapnded(!isExpanded)}
		>
			<div className='border-b p-5'>
				{camp.facltNm}
				{camp.lineIntro}
				{slectiveRendering}
				<p>캠핑장 주소:{camp.addr1}</p>
				<p>펫입장여부:{camp.animalCmgCl}</p>
				<a
					className='text-black 
											underline text-xs hover:text-red-500 '
					href={camp.homepage}
				>
					Home Page Link
				</a>
			</div>
		</div>
	);
};

export default CampingListDetail;
