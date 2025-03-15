import { axiosInstance } from "."

export const signupUser = async(user) => {
    try {
        const response = await axiosInstance.post('/api/auth/signup', user)
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

export const loginUser = async(user) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', user)
        console.log(response)
        return response.data;
    } catch (error) {
        return error
    }
}