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

export const todosSlice = createSlice({
    name: "Todos Slice",
    initialState: {
        items: [
        
    ],
    isLoading: false,
    error: null,
    activeFilter : "all",
    addingIsLoading: false,
    addingError: null,
    },
    reducers: {
       
      
        toggle : (state,action) => {
            const {id} = action.payload;
            
            const item = state.items.find((item) => item.id === id);
              item.completed === true  ? ( item.completed = false ) :   item.completed = true ;
    
            
         },
         destroy : (state,action) => {
             const id = action.payload;
             const filtered = state.items.filter((item) => item.id !== id )
             state.items = filtered;
         },
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
       }

}})

export const { toggle , destroy, updateActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;
 