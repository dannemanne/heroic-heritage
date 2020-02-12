export function registerReducer(initialState, responders) {
  return (state = initialState, { type, ...action }) => {
    if (responders[type]) {
      return Object.assign({}, state, responders[type](state, action));
    }
    return state;
  };  
}
