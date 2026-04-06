import { getCustomersService } from '../services/customer.service.js';

export const getCustomers = async (req, res) => {
  try {
    const result = await getCustomersService(req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error('Error fetching customers:', err);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
