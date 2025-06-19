//交換機能を実装する
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CardExchange() {
  const [recipientCardId, setRecipientCardId] = useState("");

  const handleSendRequest = async () => {
    const response = await Inertia.post('/exchange/request', {
      recipientCardId,
      _token: document.head.querySelector('meta[name="csrf-token"]').content, // CSRFトークン
      // Cloudflare Turnstileトークンもここに追加
      turnstile_token: window.turnstile.getToken(), // Turnstileのトークン取得
    });
    
    if (response.status === 200) {
      // 成功時の処理
      console.log('交換リクエストを送信しました');
    } else {
      // エラーハンドリング
      console.error('交換リクエストの送信に失敗しました');
    }
  };

  return (
    <div>
      <Input
        placeholder="交換相手の名刺IDを入力"
        value={recipientCardId}
        onChange={(e) => setRecipientCardId(e.target.value)}
      />
      <Button onClick={handleSendRequest}>交換リクエストを送信</Button>
    </div>
  );
}