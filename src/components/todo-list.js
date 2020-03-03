import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

import './todo.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.default,
  },
}));

const Todos = ({ todos, onDelete, onCheck }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Todo List</h2>
      <List>
      {todos != null && 
        todos.map((todo) => (
        <ListItem key={todo.id}>
          <ListItemIcon>
            <Checkbox checked={!!todo.done} value="done" onChange={() => {onCheck(todo.id)}}/>
          </ListItemIcon>
          <ListItemText className={(todo.done ? 'done' : '')} primary={todo.title}/>
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => {onDelete(todo.id)}}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))} 
      </List>
    </div>
  )
};

export default Todos