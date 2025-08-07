//task 1

function getSimplifiedBill(bill, items) {
    return {
      id: bill.id,
      billNumber: bill.billNumber,
      opentime: bill.opentime,
      customerName: bill.customerName,
      billItems: bill.billItems.map(billItem => {
        const item = items.find(i => i.id === billItem.id);
        return {
          id: billItem.id,
          name: item ? item.itemName : "",
          quantity: billItem.quantity,
        };
      }),
    };
  }
  
  // Example usage:
  console.log(getSimplifiedBill(bill, items));

  
  //task2
  function getDetailedBill(bill, items, categories) {
    let totalAmount = 0;
  
    const billItemsDetailed = bill.billItems.map(billItem => {
      const item = items.find(i => i.id === billItem.id);
      const category = categories.find(c => c.id === (item ? item.category.categoryId : ""));
      // Calculate base amount
      let amount = item ? item.rate * billItem.quantity : 0;
  
      // Apply discount
      if (billItem.discount) {
        if (billItem.discount.isInPercent === "Y") {
          amount -= (amount * billItem.discount.rate) / 100;
        } else {
          amount -= billItem.discount.rate;
        }
      }
  
      // Calculate taxes
      let taxAmount = 0;
      const taxes = item && item.taxes ? item.taxes : [];
      taxes.forEach(tax => {
        if (tax.isInPercent === "Y") {
          taxAmount += (amount * tax.rate) / 100;
        } else {
          taxAmount += tax.rate;
        }
      });
  
      amount += taxAmount;
  
      // Add to total
      totalAmount += amount;
  
      return {
        id: billItem.id,
        name: item ? item.itemName : "",
        quantity: billItem.quantity,
        discount: billItem.discount,
        taxes: taxes,
        amount: Number(amount.toFixed(2)),
        superCategoryName: category ? category.superCategory.superCategoryName : "",
        categoryName: category ? category.categoryName : "",
      };
    });
  
    return {
      id: bill.id,
      billNumber: bill.billNumber,
      opentime: bill.opentime,
      customerName: bill.customerName,
      billItems: billItemsDetailed,
      "Total Amount": Number(totalAmount.toFixed(2)),
    };
  }
  
  // Example usage:
  console.log(getDetailedBill(bill, items, categories));
  