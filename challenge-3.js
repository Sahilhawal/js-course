const bills = [124, 48, 268];

const tips = bills.map((bill) => {
  if (bill < 50) {
    return bill * 0.2;
  } else if (50 < bill < 200) {
    return bill * 0.15;
  } else if (50 < bill < 200) {
    return bill * 0.1;
  }
});

const totalBills = bills.map((bill) => {
  if (bill < 50) {
    return bill + bill * 0.2;
  } else if (50 < bill < 200) {
    return bill + bill * 0.15;
  } else if (50 < bill < 200) {
    return bill + bill * 0.1;
  }
});

console.log("Tips ", tips);
console.log("Total Bills", totalBills);
