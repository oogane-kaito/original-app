import {useState,useEffect} from "react";
import { getUser, login as apiLogin ,logout as apiLogout } from "../api/auth";

export function useAuth(){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        getUser()
            .then(res=>setUser(res.data))
            .catch(()=>setUser(null))
            .finally(()=>setLoading(false))

    },[]);

    const login = async (email,password) => {
        try {
                await apiLogin(email, password); // APIでログインを試みる
                const res = await getUser(); // ユーザー情報を取得
                setUser(res.data); // 取得したユーザー情報を設定
            } catch (error) {
                console.log(email)
                console.log(password)
                console.error("Login error:", error);
                throw error; // エラーを再スローして呼び出し元で処理
            }
    }

    const logout = async() => {
        await apiLogout();
        setUser(null);
    }

    return {user,loading,login,logout}
}