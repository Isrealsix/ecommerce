import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome To Eazy-Shop',
	description: 'We sell the best products ever created',
	keywords: 'electronics, iphone, airpods, buy, cheap',
};
export default Meta;
