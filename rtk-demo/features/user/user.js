const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}
// Generates pending, fulfilled, rejected action types
const fetchUsers = createAsyncThunk('user/fetchUsers' , () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/users1')
        .then( response => response.data.map( (user) => user.id ) ) 
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            /* action
                {
                    type: 'user/fetchUsers/rejected',
                    meta: {
                        arg: ...,
                        requestId: ....,
                        rejectedWithValue: false,
                        requestStatus: 'rejected',
                        aborted: false,
                        condition: false
                    },
                    error: {
                        name: 'AxiosError',
                        message: 'Request failed with status code 404',
                        stack: ....,
                        code: 'ERR_BAD_REQUEST'
                    }
                }
            */
            // console.log(action)
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    }
})

module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers