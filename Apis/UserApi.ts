import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.0.2.2:8080'
});
export const getUser = (id: string) => {
    return new Promise((resolve, reject) => {
        api.get(`/user/getUser?id=${id}`).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err);
        })
    });
}
export const updateUser = (params: any) => {
    return new Promise((resolve, reject) => {
        api.post('/user/updateUser', params).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err);
        })
    })
}