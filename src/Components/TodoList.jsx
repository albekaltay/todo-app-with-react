import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {  toggle , destroy, getTodosAsync} from '../redux/todos/todosSlice';
import Loading from './Loading';
import Error from './Error';

const TodoList = () => {

	useEffect(() => {
	 dispatch(getTodosAsync())
	}, [])
	

const todos = useSelector(state => state.todos.items)
const isLoading = useSelector(state => state.todos.isLoading)
const error = useSelector(state => state.todos.error)

const activeFilter = useSelector(state => state.todos.activeFilter)
let filtered = [];



if (activeFilter === "all") {
	filtered=todos;
} 
 if (activeFilter ==="active") {
	filtered = todos.filter( (item) => item.completed === false)

} 
if (activeFilter ==="completed")  {
	filtered = todos.filter( (item) => item.completed === true)

}


const dispatch = useDispatch()

const handleDestroy = (id) => {
	if(window.confirm("Are you sure? ")) {
		dispatch(destroy(id))
	}

}


if (isLoading) {
	return <Loading error> </Loading>
} 
if (error) {
	return <Error message={'Error: '+ error}> </Error>
}
  return (
    <ul className="todo-list">
			{/* <li className="completed">
				<div className="view">
					<input className="toggle" type="checkbox"/>
					<label>Learn JavaScript</label>
					<button className="destroy"></button>
				</div>
			</li> */}

		

		{ filtered.map((todo) => (


			<li className={todo.completed ? "completed" : ""} key={todo.id}>
				<div className="view">
					<input className="toggle" type="checkbox" onChange={() => dispatch(toggle({id: todo.id}))} checked={todo.completed} />
					<label>{todo.title}</label>
					<button className="destroy" onClick={() => handleDestroy(todo.id)}></button>
				</div>
			</li>
		))}
		</ul>
  )
}

export default TodoList