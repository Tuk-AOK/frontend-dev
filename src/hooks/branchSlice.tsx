import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BranchState {
  uuid: string;
  mainBranchUuid: string; 
  mainBranchId: String;
}

const initialState: BranchState = {
  uuid: '',
  mainBranchUuid: '',
  mainBranchId: '',

}

const BranchSlice = createSlice({
  name: 'branch', 
  initialState,
  reducers: {
    setBranchUuid: (state, action:PayloadAction<string>) => {
      state.uuid = action.payload; 
    },

    setMainBranchId: (state, action:PayloadAction<string>) => {
      state.mainBranchId = action.payload; 
    },

    setMainBranchUuid: (state, action:PayloadAction<string>) => {
      state.mainBranchUuid = action.payload; 
    },
  }
});

export const { setBranchUuid, setMainBranchId, setMainBranchUuid } = BranchSlice.actions;
export default BranchSlice.reducer;