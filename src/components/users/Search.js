import React, { useState, useContext } from 'react'
import githubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
    const GithubContext = useContext(githubContext);  //future use small g and capital G respectively
    const alertContext = useContext(AlertContext);
    const [ text, setText ] = useState('')

   const onSubmit = e => {
        e.preventDefault();
        if(text === ''){
            alertContext.setAlert('Please enter something','light');
        }
        else{
            GithubContext.searchUsers(text)
            setText('');
        }
    }
   const onChange = e => setText(e.target.value );
        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input type="text" name='text' placeholder='Search Users...' value={text} onChange={onChange}/>
                    <input type="submit" value="Search" className='btn btn-block btn-dark'/>
                </form>
                {GithubContext.users.length > 0 && (
                    <button onClick={GithubContext.clearUsers} className='btn btn-block btn-light'>Clear</button>
                )}

            </div>
        )
}

export default Search
