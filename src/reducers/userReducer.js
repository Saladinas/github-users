import { FETCH_USERS, FETCH_USER, CLEAR_USER, HANDLE_CHANGE, HANDLE_CHECKBOX_CHANGE } from '../actionTypes/userTypes';

const initialUser = {
  login: null,
}

const initialState = {
  users: [],
  user: initialUser,
  searchValue: '',
  exactSearch: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.users
      }
    case FETCH_USER:
      return {
        ...state,
        user: action.user
      }
    case CLEAR_USER:
      return {
        ...state,
        user: initialUser
      }
    case HANDLE_CHANGE:
      return {
        ...state,
        searchValue: action.searchValue
      }
    case HANDLE_CHECKBOX_CHANGE:
      return {
        ...state,
        exactSearch: action.exactSearch
      }
    default:
      return state
  }
}
