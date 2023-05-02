const { configureStore } = require("@reduxjs/toolkit");
const { default: authReducer } = require("./auth");

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
export default store;
