const categories = [
    'Food & Dining', 
    'Transportation',
    'Groceries',
    'House', 
    'Health & Wellness',
    'Entertainment',
    'Shopping',
    'Education',
    'Bills & Utilities',
    'Savings & Investments', 
    'Miscellaneous',
  ];

  const categories_map = {
    'Food & Dining': 'FOOD_AND_DINING',
    'Transportation': 'TRANSPORTATION',
    'Groceries': 'GROCERIES',
    'House': 'HOUSE',
    'Health & Wellness': 'HEALTH_AND_WELLNESS',
    'Entertainment': 'ENTERTAINMENT',
    'Shopping': 'SHOPPING',
    'Education': 'EDUCATION',
    'Bills & Utilities': 'BILLS_AND_UTILITIES',
    'Savings & Investments': 'SAVINGS',
    'Miscellaneous': 'MISCELLANEOUS'
  };

  const months = ['Jan', 'Feb', 'March', 'April' , 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const months1 = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL' , 'MAY','JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const monthMap = months.reduce((acc, month, index) => {
    acc[month] = index + 1;
    return acc;
}, {});

const indexMonthMap = months1.reduce((acc, month, index) => {
  acc[index+1] = month;
  return acc;
}, {});

  export { categories, categories_map, months, monthMap, indexMonthMap };