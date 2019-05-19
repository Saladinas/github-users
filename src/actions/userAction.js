import axios from 'axios';
import { FETCH_USERS, FETCH_USER, CLEAR_USER, HANDLE_CHANGE, HANDLE_CHECKBOX_CHANGE } from '../actionTypes/userTypes';

const apiUrl = 'https://api.github.com';
const clientID = '9a2cb0e433049e99da0f';
const clientSecret = 'bd6e4f5de5564a22bef817d3e2d039019dd5d7d8';
const authPart = `client_id=${clientID}&client_secret=${clientSecret}`;

export const fetchUsers = (users) => {
    return {
        type: FETCH_USERS,
        users
    }
};

export const fetchUser = (user) => {
    return {
        type: FETCH_USER,
        user
    }
};

export const handleCheckboxChange = (checked) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_CHECKBOX_CHANGE,
            exactSearch: checked
        });
        return dispatch(filterUsers());
    };
};

export const handleChange = (searchValue) => {
    return {
        type: HANDLE_CHANGE,
        searchValue: searchValue
    }
};

export const clearUser = () => {
    return (dispatch) => {
        return dispatch({
            type: CLEAR_USER,
        })
    };
};

export const fetchAllUsers = () => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/users?${authPart}`)
            .then(response => {
                dispatch(fetchUsers(response.data))
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const filterUsers = () => {
    return (dispatch, getState) => {
        const { searchValue, exactSearch } = getState().userReducer;

        dispatch(handleChange(searchValue)); // Update search value

        if (!searchValue) { // Empty search field - fetch first n users
            return dispatch(fetchAllUsers());
        }

        if (exactSearch) { // Exact search checked - fetch concrete user information
            return axios.get(`${apiUrl}/users/${searchValue}?${authPart} `)
                .then(response => {
                    dispatch(fetchUsers([response.data]))
                })
                .catch(error => {
                    throw (error);
                });
        }
        // Otherwise filter users by search phrase
        return axios.get(`${apiUrl}/search/users?q=${searchValue}&type=Users&${authPart} `)
            .then(response => {
                dispatch(fetchUsers(response.data.items))
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchUserDetails = (userLogin) => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/users/${userLogin}?${authPart}`)
            .then(response => {
                dispatch(fetchUser(response.data))
            })
            .catch(error => {
                throw (error);
            });
    };
};