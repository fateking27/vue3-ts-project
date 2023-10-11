import http from "@/utils/http";

interface UserItem {
    username: string;
    password?: string;
}

const global = {
    login: (data: UserItem) => http.post('/login', data),
    getMenus: (data: UserItem) => http.get('/menu/' + data.username),
    getUsers: (data?: any) => http.get("/user", data),
    // getUsers:() => http.get('/user'),
    getRecord: (data: UserItem) => http.get('/index/' + data.username),
    getDept:() => http.get('/dept')
}

export default global;