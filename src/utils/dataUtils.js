function formatDate(date) {
  if (!date) return '';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}.${month}.${year}`;
  } catch (error) {
    return '';
  }
}

function calculateTotal(array) {
  if (!Array.isArray(array)) return 0;
  
  return array.reduce((sum, item) => {
    const value = Number(item);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
}

function filterByProperty(array, property, value) {
  if (!Array.isArray(array)) return [];
  
  return array.filter(item => item && item[property] === value);
}

function sortByField(array, field, order = 'asc') {
  if (!Array.isArray(array)) return [];
  if (!field) return [...array];
  if (order !== 'asc' && order !== 'desc') return [...array];
  
  return [...array].sort((a, b) => {
    if (a[field] === undefined || b[field] === undefined) return 0;
    
    const valueA = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
    const valueB = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];
    
    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

module.exports = {
  formatDate,
  calculateTotal,
  filterByProperty,
  sortByField
}; 