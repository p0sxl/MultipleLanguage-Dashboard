import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account : {},
  token : ""
}

export const account = createSlice({
    name: 'account',
    initialState,
    reducers: {
      setAccount: (state,action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.account = action.payload
      },
      setToken: (state,action) => {
        state.token = action.payload
      },
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setAccount, setToken } = account.actions
  
  export default account.reducer
  
