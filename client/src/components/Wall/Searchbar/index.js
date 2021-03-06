import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'
import ReactTags from 'react-tag-autocomplete'


import './Searchbar.css'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            suggestions: [
                { id: 1, name: 'WebDev' },
                { id: 2, name: 'UXUI' },
                { id: 3, name: 'Data' },
                { id: 4, name: 'Jobs' },
                { id: 5, name: 'Projects' },
                { id: 6, name: 'Offers' },
                { id: 7, name: 'Requests' },
                { id: 8, name: 'Misc' },
            ]
        }
        this.postsService = new PostsService()

        this.reactTags = React.createRef()
    }
    onDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })

        const groupedTags = tags.map(({ name }) => name).join(',')
        this.props.filterPosts(groupedTags)
        this.props.updateWall()
    }

    onAddition(tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })

        
        const groupedTags = tags.map(({ name }) => name).join(',')
        this.props.filterPosts(groupedTags)

    }

    render() {
console.log("ES ESTE",this.state.tags)

        return (

            <>

                <ReactTags
                    ref={this.reactTags}
                    tags={this.state.tags}
                    suggestions={this.state.suggestions}
                    onDelete={this.onDelete.bind(this)}
                    onAddition={this.onAddition.bind(this)} />
            </>
        )
    }
}
export default SearchBar