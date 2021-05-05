import axiosClient from './axiosClient'

const Question = {

    get_user: (id) => {
        const url = `/user/${id}`
        return axiosClient.get(url)
    },

    post_answer: (data) => {
        const url = `/answer`
        return axiosClient.post(url, data)
    },

    get_answer: (id) => {
        const url = `/answer/${id}`
        return axiosClient.get(url)
    },

    get_all_score: () => {
        const url = `/score`
        return axiosClient.get(url)
    },

    get_score: (id) => {
        const url = `/score/${id}`
        return axiosClient.get(url)
    }

}

export default Question