import { getCustomersQuery } from '../repositories/customer.repository.js';

export const getCustomersService = async (query) => {
  let { page = '1', limit = '10', search = '', sortBy = 'id', order = 'desc' } = query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  const MAX_LIMIT = 100;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const allowedSortFields = ['id', 'first_name', 'last_name', 'email', 'city', 'company'];
  if (!allowedSortFields.includes(sortBy)) {
    sortBy = 'id';
  }

  order = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  const offset = (page - 1) * limit;

  const result = await getCustomersQuery({
    search,
    sortBy,
    order,
    limit,
    offset,
  });

  const totalPages = Math.ceil(result.totalItems / limit);

  return {
    data: result.data,
    pagination: {
      totalItems: result.totalItems,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

