import axios from "axios";

axios.defaults.withCredentials = true;

export async function login(email, password) {
    try {
        // CSRFトークンを取得
        const csrfResponse = await axios.get("/sanctum/csrf-cookie");
        if (!csrfResponse) {
            throw new Error("CSRFトークン取得に失敗しました");
        }

        console.log(`email(ログイン内の処理): ${email}`);
        console.log(`password(ログイン内の処理): ${password}`);

        // ログインリクエストを送信
        const loginResponse = await axios.post("/api/login", { email, password });
        
        // ログイン成功時の処理
        console.log("ログイン成功:", loginResponse.data);
        console.log(loginResponse)
    } catch (error) {
        console.error("ログインエラー:", error.response ? error.response.data : error.message);
        throw error; // エラーを再スローして呼び出し元で処理
    }
}

export async function logout(){
    await axios.get("/sanctum/csrf-cookie");
    return axios.post("/api/logout")
}

export async function getUser(){
    await axios.get("/sanctum/csrf-cookie");
    return axios.get("/api/user",{email,password})
}

   export async function register({ name, email, password, password_confirmation }) {
       await axios.get("/sanctum/csrf-cookie");
       return axios.post("/api/register", { name, email, password, password_confirmation });
   }
   