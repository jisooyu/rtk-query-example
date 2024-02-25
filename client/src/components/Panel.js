import classNames from 'classnames';

function Panel({ children, className, ...rest }) {
	const finalClassName = classNames(
		className,
		'border rounded p-3 shadow bg-white w-ful'
	);
	return (
		<div
			{...rest}
			className={finalClassName}
		>
			{children}
		</div>
	);
}

export default Panel;
