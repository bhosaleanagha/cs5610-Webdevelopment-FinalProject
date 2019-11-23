import React from 'react';
import { Button, Container} from 'react-bootstrap';
import { Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: 'profile',
            tags: [],
            suggestions: [],
        }


        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.check = this.check.bind(this);
        //this.changed = this.changed.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_WORDS',
            data: data,
        });
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    check() {
        let keyword = this.state.tags;
        let keywords = [];
        for (let i = 0; i < keyword.length; i++) {
            keywords.push(keyword[i]["id"]);
        }
        this.changed({searchWords: keywords});
        get_recipes(this);
    }

    render() {
        return (
            <h1>Profile</h1>
        )

    }
}

function state2props(state) {
    // return state.forms.home_search;
}

export default connect(state2props)(Profile);