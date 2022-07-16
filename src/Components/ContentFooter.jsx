import React , {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { updateActiveFilter, clearCompleted } from '../redux/todos/todosSlice';
import { useDispatch } from 'react-redux';

const ContentFooter = () => {

    const items = useSelector((state) => state.todos.items);
    const itemsLeft = items.filter(item => !item.completed ).length;

    const activeFilter = useSelector( (state) => state.todos.activeFilter)

    useEffect(() => {
      localStorage.setItem("activeFilter", activeFilter)
    }, [activeFilter])
    
  

    const dispatch = useDispatch();

  return (
      
    <footer className="footer">


    <span className="todo-count">
        <strong>{itemsLeft}</strong> {" "}
        item{itemsLeft>1 && "s" } left
    </span>

    <ul className="filters">
        <li>
            <a className={activeFilter === "all" ? "selected" : ""} onClick={() => dispatch(updateActiveFilter("all"))}>All</a>
        </li>
        <li>
            <a className={activeFilter === "active" ? "selected" : ""} onClick={() => dispatch(updateActiveFilter("active"))}>Active</a>
        </li>
        <li>
            <a className={activeFilter === "completed" ? "selected" : ""} onClick={() => dispatch(updateActiveFilter("completed"))}>Completed</a>
        </li>
    </ul>

  
    <button className="clear-completed" onClick={() => dispatch(clearCompleted())}>
        Clear completed
    </button>
</footer>
  )
}

export default ContentFooter