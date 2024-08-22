const generateCommission = (
  totalDealAmount,
  totalCommissionAtDeal,
  paidAmount
) => {
  return ((totalCommissionAtDeal / totalDealAmount) * paidAmount).toFixed(2);
};

module.exports = { generateCommission };
