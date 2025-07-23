export const fetchUserPending = (state) => {
    state.loading = true;
    state.error = null;
};

export const fetchUserFulfilled = (state, action) => {
    state.loading = false;
    state.user = action.payload;
};

export const fetchUserRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

export const loginUserPending = (state) => {
    state.loading = true;
    state.error = null;
};

export const loginUserFulfilled = (state, action) => {
    state.loading = false;
    state.user = action.payload;
};

export const loginUserRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

export const registerUserPending = (state) => {
    state.loading = true;
    state.error = null;
};

export const registerUserFulfilled = (state, action) => {
    state.loading = false;
    state.user = action.payload;
};

export const registerUserRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

export const googleLoginPending = (state) => {
    state.loading = true;
    state.error = null;
};

export const googleLoginFulfilled = (state, action) => {
    state.loading = false;
    state.user = action.payload;
};

export const googleLoginRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

export const logoutUserPending = (state) => {
    state.loading = true;
    state.error = null;
};

export const logoutUserFulfilled = (state) => {
    state.loading = false;
    state.user = null;
};

export const logoutUserRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

// export const updateUserPending = (state) => {
//     state.loading = true;
//     state.error = null;
// };

// export const updateUserFulfilled = (state, action) => {
//     state.loading = false;
//     state.user = action.payload;
// };

// export const updateUserRejected = (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
// };
