function calculateSubTotal(saleItems) {
    let subTotal = 0;
    for(const item of saleItems) {
        subTotal += item.quantity * Number(item.unitPrice);
    }
    return Number(subTotal).toFixed(2);
}

function calculateTotal(saleItems, discountRate = 0, taxRate = 0) {
    const subTotal = calculateSubTotal(saleItems);

    // Apply rates
    const afterDiscount = subTotal * (1 - Number(discountRate));
    const total = afterDiscount * (1 + Number(taxRate));

    // Round final total to 2 decimal places safely
    const totalAmount = Number(total.toFixed(2));

    return {
        totalAmount,
        subTotal
    }
}

export default calculateTotal;