import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";



export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const response = await axios("http://localhost:7000/todos");
    return response.data;
})

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
    const response = await axios.post("http://localhost:7000/todos", data)
    return response.data;
})

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async({id,data}) => {
    const response = await axios.patch(`http://localhost:7000/todos/${id}`,data)
    return response.data;

})

export const removeTodoAsync = createAsyncThunk("todos/removeTodoAsync", async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`)
    return id;
} )


export const todosSlice = createSlice({
    name: "Todos Slice",
    initialState: {
        items: [ 
    ],
    isLoading: false,
    error: null,
    activeFilter : localStorage.getItem("activeFilter"),
    addingIsLoading: false,
    addingError: null,
    },
    reducers: {
       
    
         updateActiveFilter: (state,action) =>{
             
             state.activeFilter = action.payload;
             
         }, 
         clearCompleted : (state) => {
             const filtered = state.items.filter( (item) => item.completed === false)
             state.items = filtered;
         }
    },
    extraReducers: {
        [getTodosAsync.pending] : (state,action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled] : (state,action) => {
            
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected] : (state,action) => {
            state.isLoading = false;
            state.error = action.error.message;

        },
        [addTodoAsync.pending] : (state) => {

           state.addingIsLoading = true;


        },

        [addTodoAsync.fulfilled] : (state,action) => {
             state.items.push(action.payload);
             state.addingIsLoading = false;
        },
        [addTodoAsync.rejected] : (state,action) => {
            state.addingError = action.error.message;
            state.addingIsLoading = false;
       },
       // togle todo
       [toggleTodoAsync.fulfilled] : (state,action) => {
 
        
         const {id, completed} = action.payload;
         const index = state.items.findIndex(item => item.id === id) 
         state.items[index].completed = completed;

       },

       // delete todo 

       [removeTodoAsync.fulfilled] : (state,action) => {
        console.log(action.payload);
        const id = action.payload;

     
        const filtered = state.items.filter(item => item.id !== id)
        state.items = filtered;
        
       }

}})

export const {updateActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;
 