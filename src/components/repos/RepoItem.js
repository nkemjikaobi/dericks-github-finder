import React from 'react'
import PropTypes from 'prop-types'


export const RepoItem = ({ repo }) => {
    RepoItem.propTypes = {
        repo: PropTypes.object.isRequired
    }
    return (
        <div className="card">
            <h3>
                <a href={repo.html_url} target='_blank' rel='noreferrer'>{repo.name}</a>
            </h3>
        </div>
    )
}

export default RepoItem