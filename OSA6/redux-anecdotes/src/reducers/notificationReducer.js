import { createSlice }  from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification: (state, action) => {
            return action.payload;
        },
        nullNotification: (state, action) => {
            return '';
        }
    }
});

export const displayNotification = (message, time, dispatch) => {
        dispatch(setNotification(message));
        setTimeout(() => {
            dispatch(nullNotification());
        }, time * 1000);
};


export const { setNotification } = notificationSlice.actions;
export const { nullNotification } = notificationSlice.actions;
export default notificationSlice.reducer;