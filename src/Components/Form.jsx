import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addTodoAsync } from '../redux/todos/todosSlice'
import Error from './Error'
import Loading from './Loading'







const Form = () => {



  const isLoading = useSelector( state => state.todos.addingIsLoading )
  const error = useSelector( state => state.todos.addingError )

  const [title, setTitle] = useState("")


  


  const dispatch = useDispatch();

  const handleSubmit = async (e) => {  
   
    
    e.preventDefault();
    if (!title) return;
    const a = await dispatch(addTodoAsync({title}))
    console.log(a)
    setTitle("")

    
  }



  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', alignItems:"center"}}>
    <input className="new-todo" placeholder="What needs to be done?" autoFocus  value={title} onChange={e => setTitle(e.target.value)} />
   
    {isLoading && <Loading></Loading>}
     {error && <Error message={error}> </Error>}

</form>
  )
}

export default Form