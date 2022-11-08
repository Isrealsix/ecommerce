import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyworld = '' }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map(x => (
					<LinkContainer
						key={x + 1}
						to={
							!isAdmin
								? keyworld
									? `/search/${keyworld}/page/${x + 1}`
									: `/page/${x + 1}`
								: `/admin/productlist/${x + 1}`
						}
					>
						<Pagination.Item>{x + 1}</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	);
};

export default Paginate;
