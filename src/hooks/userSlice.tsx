import {createSlice, PayloadAction} from '@reduxjs/toolkit';

//임시적으로 회원가입 REST API를 통해 return하는 uuid 값을 저장할 수 있도록 세팅
interface UserState {
  userUuid: string;
  userId: string;
}

const initialState: UserState = {
  userUuid: '',
  userId: '',
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUuid: (state, action:PayloadAction<string>) => {
      state.userUuid = action.payload;
    },

    setUserId: (state, action:PayloadAction<string>) => {
      state.userUuid = action.payload;
    },


    },
});

export const { setUuid } = userSlice.actions;
export default userSlice.reducer;