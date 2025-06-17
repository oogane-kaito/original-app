// import React, { useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// export default function LoginPage() {
//     const { login } = useAuth();
//     const [form, setForm] = useState({ email: "", password: "" });
//     const [error, setError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         try {
//             console.log(form)
//             console.log(form.email)
//             console.log(form.password)
//             await login(form.email, form.password);
//         } catch (e) {
//             setError("ログイン失敗");
//             console.log(e);
//             console.log(form)
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold text-center text-gray-800">ログイン</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
//                         <input
//                             type="email"
//                             value={form.email}
//                             onChange={e => setForm({ ...form, email: e.target.value })}
//                             placeholder="example@gmail.com"
//                             required
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none px-3 py-2"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">パスワード</label>
//                         <input
//                             type="password"
//                             value={form.password}
//                             onChange={e => setForm({ ...form, password: e.target.value })}
//                             placeholder="〇〇〇〇〇"
//                             required
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none px-3 py-2"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
//                     >
//                         ログイン
//                     </button>
//                 </form>
//                 {error && <div className="mt-4 text-red-600 bg-red-100 p-2 rounded-md">{error}</div>}
//             </div>
//         </div>
//     );
// }


import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
     console.log("フォーム内容:", form); // ここで form の内容を確認
    try {
      console.log("ログインを試みる:", form.email, form.password); // ここを追加
      await login(form.email, form.password);
    } catch {
      setError("ログインに失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={form.email}
        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
        placeholder="email"
        required
      /><br/>
      <input
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        placeholder="password"
        required
      /><br/>
      <button>ログイン</button>
      {error && <div style={{color: "red"}}>{error}</div>}
    </form>
  );
}