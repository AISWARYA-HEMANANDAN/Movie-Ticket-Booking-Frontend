import userInstance from "../axios/axiosInstance"

// Movies
export const getAllMovies = () => {
    return userInstance.get("/movie/getallmovies")
}

export const getMovieById = (id) => {
    return userInstance.get(`/movie/getmovie/${id}`)
}

export const addMovie = (movieData) => {
    return userInstance.post('/movie/addmovie', movieData);
}

export const updateMovie = (id, movieData) => {
    return userInstance.put(`/movie/updatemovie/${id}`, movieData);
}

export const deleteMovie = (id) => {
    return userInstance.delete(`/movie/deletemovie/${id}`);
}

// Screens
export const getAllScreens = (movieId, showDate, showTime) => {
    return userInstance.get(`/screen/getallscreens`, {
        params: { movieId, showDate, showTime }
    })
}

export const createScreen = (screenData) => {
    return userInstance.post('/screen/createscreen', screenData)
}

export const getScreens = () => {
    return userInstance.get('/screen/getscreens')
}

export const getScreenById = (screenId) => {
    return userInstance.get(`/screen/getscreen/${screenId}`)
}

export const updateScreen = (screenId, updatedData) => {
    return userInstance.put(`/screen/updatescreen/${screenId}`, updatedData)
}

export const deleteScreen = (screenId) => {
    return userInstance.delete(`/screen/deletescreen/${screenId}`)
}

// Booking
export const createBooking = (bookingData) => {
    return userInstance.post("/booking/createbooking", bookingData)
}

export const getBookings = () => {
    return userInstance.get('/booking/allbookings')
}

export const deleteBooking = (bookingId) => {
    return userInstance.delete(`/booking/deletebooking/${bookingId}`)
}

// Payment
export const makePayment = (data) => {
    const token = localStorage.getItem('token')
    return userInstance.post("/payment/stripe-checkout", data, {
        headers: {
            Authorization: `Bearer ${token}` // Add the token to headers
        }
    })
}









