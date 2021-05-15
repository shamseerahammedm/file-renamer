
export const handleActionStart = (type, payload) => {
  if (payload)
  {
    return {
      type: type,
      payload: payload
    };
  }
  else
  {
    return {
      type: type,
    };
  }
};

export const handleNonAPIActionFailure = (type, payload) => ({
  type: type,
  payload: payload
});

export const handleNonAPIActionSuccess = (type, payload) => ({
  type: type,
  payload: payload
});