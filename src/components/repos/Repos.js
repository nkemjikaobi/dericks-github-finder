import React from 'react'
import PropTypes from 'prop-types'
import RepoItem from './RepoItem'


export const Repos = ({ repos } ) => {

    Repos.propTypes = {
        repos: PropTypes.array.isRequired
    }
    return repos.map((repo) => <RepoItem  repo={repo} key={repo.id}/> )
}

export default Repos
