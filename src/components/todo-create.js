import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'

class TodoCreate extends React.Component{
    constructor(props) {
        super(props);
        this.state = { title: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let todo = {
            "title" : this.state.title
        }

        this.props.onSubmit(todo);
        // Empty the title string to clear things up.
        this.setState({title: ""});
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        name="title"
                        type="text"
                        label="To do title"
                        autoComplete={false}
                        required={true}
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    </Grid>
                </Grid>
            </form>
        ); 
    }
}

export default TodoCreate