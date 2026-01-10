import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const path = import.meta.env.VITE_API_PATH;

export { apiUrl, path };


//登入API
export const postSignin = (data) =>{
    return axios.post(`${apiUrl}/admin/signin`,data);
}

// 驗證登入狀態
export const userCheck = () =>{
    return axios.post(`${apiUrl}/api/user/check`,{});
}

// 登出
export const userLogout = () =>{
    return axios.post(`${apiUrl}/logout`,{});
}



// [adm] GET-取得所有產品列表
export const getProducts = () =>{
    return axios.get(`${apiUrl}/api/${path}/admin/products/all`);
};

// [adm] POST-新增單一產品
export const postNewProduct = (content) =>{
    return axios.post(`${apiUrl}/api/${path}/admin/product`, {
        data: content
    });
};

// [adm] PUT-修改單一產品
export const putSingleProduct = (id,content) =>{
    return axios.put(`${apiUrl}/api/${path}/admin/product/${id}`, {
        data: content
    });
};

// [adm] PUT-修改單一產品
export const delSingleProduct = (id) =>{
    return axios.delete(`${apiUrl}/api/${path}/admin/product/${id}`);
};



