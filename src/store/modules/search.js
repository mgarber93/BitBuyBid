export const searchTypes = {
  SET_SEARCH_TERM: 'app/SET_SEARCH_TERM'
};

const initialState = {
  term: '',
  dataSource: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case searchTypes.SET_SEARCH_TERM: 
    return {...state, term: payload};
  default: return state;
  }
};

export const setSearchTerm = payload => {
  return {
    type: searchTypes.SET_SEARCH_TERM,
    payload
  };
};
