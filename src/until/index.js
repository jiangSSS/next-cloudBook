import axios from "axios"
import { Message } from "element-ui";
import router from "../router";

// const env = process.env.NODE_ENV

const baseURL = "/api/admin"
const instance = axios.create({
    baseURL,
    timeout: 15000
})
const xhr = {
    get(url, data, config) {
        return new Promise((resolve, reject) => {
            instance.get(url, { params: data }, config).then(res => {
                if (res.data.code == 401) {
                    Message.error("登录状态失效，正在跳转登录页")
                    setTimeout(() => {
                        router.push("/")
                    })
                }
                resolve(res.data)
            })
        })
    },
    fetch(url, data, config, methods) {
        return new Promise((resolve, reject) => {
            instance[methods](url, data, config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url,data,config){
        return this.fetch(url,data,config,"post")
    },
    put(url,data,config){
        return this.fetch(url,data,config,"put")
    },
    delete(url,data,config){
        return this.fetch(url,data,config,"delete")
    }
}
export const $axios = xhr