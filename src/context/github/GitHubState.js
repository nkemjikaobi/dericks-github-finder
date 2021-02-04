import React, { useReducer } from 'react'
import axios from 'axios'
import gitHubContext from './githubContext'
import gitHubReducer from './githubReducer'
import{
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USERS
} from '../types'


//For Deployment
let gitHubClientId;
let gitHubClientSecret;

if(process.env.NODE_ENV != 'production'){
    gitHubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
else{
    gitHubClientId = process.env.GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [ state, dispatch ] = useReducer(gitHubReducer, initialState);

    //Search Users
    const searchUsers = async text => { //ES6 syntax for async is beside the parameter
    setLoading()
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);
    dispatch({
        type: SEARCH_USERS,
        payload: res.data.items
    })
  }

    //Get User
    const getUser = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
      }

    //Get Repos
    const getUserRepos = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
      }

    //Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS})

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <gitHubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
            {props.children}
    </gitHubContext.Provider>
}

export default GithubState;