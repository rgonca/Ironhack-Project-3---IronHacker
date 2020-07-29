import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'


import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class SearchBar extends Component {
    constructor() {
        super() 
        this.state = {
                posts:[],
                post: {},
                isPostViewOn: false,
                sortValue: '',
                inputValue: ''
            }
        this.postsService = new PostsService()
        
    }

      filterPosts = (tags) => {
        this.postsService
            .filterPosts(tags)
            .then(response => this.updateWall(response))
            .catch(err => console.log('muestrame el error', err))
    }
    render() {
        const { search } = this.state;
        return (

            <>
     
                <Form inline >
                    <FormControl placeholder="Search" className="mr-sm-2" onChangeText={this.updateSearch}
                        value={search}/>
                    <Button variant="outline-success">Search</Button>
                </Form>
            </>
        )
    }
}
export default SearchBar