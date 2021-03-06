export const setAccessToken = function (newAccessToken) {
  return {
      type: 'ADD_ACCESS_TOKEN',
      payload: { newAccessToken },
  };
};

export const setUserId = function (newUserId) {
  return {
      type: 'ADD_USER_ID',
      payload: { newUserId },
  };
};

export const setTotalCartQty = function (newTotalCartQty) {
  return {
      type: 'ADD_TOTAL_CART_QTY',
      payload: { newTotalCartQty },
  };
};