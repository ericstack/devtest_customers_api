const customerList = document.getElementById('customerList');
const pageInfo = document.getElementById('pageInfo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 1;
const limit = 10;

async function fetchCustomers(page = 1) {
  try {
    const response = await fetch(`http://localhost:3000/api/customers/get-customers?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();

    renderCustomers(result.data);
    updatePagination(result.pagination);
  } catch (err) {
    console.error('Error fetching customers:', err);
    customerList.innerHTML = '<li>Error loading customers</li>';
  }
}

function renderCustomers(customers) {
  customerList.innerHTML = '';

  if (customers.length === 0) {
    customerList.innerHTML = '<li>No customers found.</li>';
    return;
  }

  customers.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${c.first_name} ${c.last_name}</strong><br>
      Email: ${c.email}<br>
      Company: ${c.company || '-'}<br>
      City: ${c.city || '-'}
    `;
    customerList.appendChild(li);
  });
}

function updatePagination(pagination) {
  currentPage = pagination.currentPage;
  pageInfo.textContent = `Page ${pagination.currentPage} of ${pagination.totalPages}`;

  prevBtn.disabled = !pagination.hasPrevPage;
  nextBtn.disabled = !pagination.hasNextPage;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) fetchCustomers(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
  fetchCustomers(currentPage + 1);
});

// Load first page
fetchCustomers();