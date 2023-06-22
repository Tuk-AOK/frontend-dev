import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProjectState {
  uuid: string;
  projectId: string; 
}

const initialState: ProjectState = {
  uuid: '',
  projectId: '',
}

const ProjectSlice = createSlice({
  name: 'project', 
  initialState,
  reducers: {
    setProjectUuid: (state, action:PayloadAction<string>) => {
      state.uuid = action.payload; 
    },
    setProjectId: (state, action:PayloadAction<string>) => {
      state.projectId = action.payload; 
    },
  }
});

export const { setProjectUuid, setProjectId } = ProjectSlice.actions;
export default ProjectSlice.reducer;