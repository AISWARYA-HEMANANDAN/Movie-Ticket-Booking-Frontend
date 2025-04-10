import userInstance from "../axios/axiosInstance"

export const getAllMovies  = () => {
    return userInstance.get("/movie/getallmovies")
}

export const getMovie  = (movieId) => {
    return userInstance.post(`/movie/getmovie/${movieId}`)
}