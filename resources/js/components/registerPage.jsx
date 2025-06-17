import React, { useState } from "react";
import { register } from "../api/auth";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "", email: "", password: "", password_confirmation: "" // 名前を変更
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setSuccess("");
        try {
            await register(form); // formをそのまま送信
            setSuccess("登録が完了しました。ログインしてください。");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                Object.values(err.response?.data?.errors || {}).flat().join("\n") ||
                "登録に失敗しました"
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">ユーザー登録</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">名前</label>
                        <input
                            type="text"
                            placeholder="名前"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                        <input
                            type="email"
                            placeholder="メールアドレス"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">パスワード</label>
                        <input
                            type="password" // typeをpasswordに変更
                            placeholder="パスワード"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">パスワード(確認)</label>
                        <input
                            type="password" // typeをpasswordに変更
                            placeholder="パスワード(確認)"
                            value={form.password_confirmation} // 名前を変更
                            onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        登録
                    </button>
                </form>
                {error && <div className="mt-4 text-red-600">{error}</div>}
                {success && <div className="mt-4 text-green-600">{success}</div>}
            </div>
        </div>
    );
}