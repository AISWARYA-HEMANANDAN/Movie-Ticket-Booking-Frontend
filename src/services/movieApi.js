import userInstance from "../axios/axiosInstance"
import adminInstance from "../axios/adminInstance";

// ---------------- Movies ----------------

// User APIs
export const getAllMovies = () => userInstance.get("/movie/getallmovies");
export const getMovieById = (id) => userInstance.get(`/movie/getmovie/${id}`);

// Admin APIs
export const addMovie = (formData) => {
    return adminInstance.post('/movie/createmovie', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const updateMovie = (id, formData) => {
    return adminInstance.put(`/movie/updatemovie/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteMovie = (id) => adminInstance.delete(`/movie/deletemovie/${id}`);


// ---------------- Screens ----------------

// User API
export const getAllScreens = (movieId, showDate, showTime) => {
    return userInstance.get(`/screen/getallscreens`, {
        params: { movieId, showDate, showTime },
    });
};

// Admin APIs
export const createScreen = (screenData) => adminInstance.post('/screen/createscreen', screenData);
export const getScreens = () => adminInstance.get('/screen/getscreens');
export const getScreenById = (screenId) => adminInstance.get(`/screen/getscreen/${screenId}`);
export const updateScreen = (screenId, updatedData) =>
    adminInstance.patch(`/screen/updatescreen/${screenId}`, updatedData);
export const deleteScreen = (screenId) => adminInstance.delete(`/screen/deletescreen/${screenId}`);
export const addMovieScheduleToScreen = (scheduleData) =>
    adminInstance.post('/screen/addmoviescheduletoscreen', scheduleData);

export const getAllScreensAdmin = () => adminInstance.get('/screen/getallscreens');



// ---------------- Booking ----------------

// User API
export const createBooking = (bookingData) => userInstance.post("/booking/createbooking", bookingData);

// Admin API
export const getBookings = () => adminInstance.get('/booking/getbookings');

// Admin (optional) — if only admin can delete
export const deleteBooking = (bookingId) => adminInstance.delete(`/booking/deletebooking/${bookingId}`);



// ---------------- Users ----------------

// Admin API
export const getAllUsers = () => adminInstance.get('/user/getallusers');



// ---------------- Payment ----------------

export const makePayment = (data) => {
    const token = localStorage.getItem('token');
    return userInstance.post("/payment/stripe-checkout", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
