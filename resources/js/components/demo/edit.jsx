import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Plus, Trash2, Eye, Save, Share2, Palette, User, LinkIcon, ArrowLeft, Sun } from "lucide-react";
import { Link } from "@inertiajs/react";
import { DigitalCard } from "../edit/digital-card";

export default function DemoEditorPage() {
  const [cardData, setCardData] = useState({
    name: "田中 花子",
    title: "自然が大好きな先生",
    bio: "みんなと一緒に自然の素晴らしさを学んでいます🌱\n毎日新しい発見があって楽しいです！",
    avatar: "/placeholder.svg?height=120&width=120",
    theme: "nature",
    backgroundColor: "#f0fdf4",
    textColor: "#1f2937",
    accentColor: "#22c55e",
    phone:"",
    email:"",
    links: [
      { id: "1", title: "Twitter", url: "https://twitter.com/username", icon: "twitter" },
      { id: "2", title: "Instagram", url: "https://instagram.com/username", icon: "instagram" },
      { id: "3", title: "ブログ", url: "https://myblog.com", icon: "website" },
    ],
  });

  const [activeTab, setActiveTab] = useState("basic");

  const themes = [
    { id: "nature", name: "しぜん", bg: "#f0fdf4", accent: "#22c55e", icon: "🌿" },
    { id: "sunny", name: "たいよう", bg: "#fff7ed", accent: "#f97316", icon: "☀️" },
    { id: "warm", name: "あたたか", bg: "#fef3c7", accent: "#f59e0b", icon: "🌻" },
    { id: "fresh", name: "さわやか", bg: "#f0f9ff", accent: "#0ea5e9", icon: "💧" },
    { id: "gentle", name: "やさしい", bg: "#fdf4ff", accent: "#d946ef", icon: "🦋" },
  ];

  const addLink = () => {
    const newLink = {
      id: Date.now().toString(),
      title: "",
      url: "",
      icon: "website",
    };
    setCardData((prev) => ({
      ...prev,
      links: [...prev.links, newLink],
    }));
  };

  const removeLink = (id) => {
    setCardData((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.id !== id),
    }));
  };

  const updateLink = (id, field, value) => {
    setCardData((prev) => ({
      ...prev,
      links: prev.links.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    }));
  };

  const updateTheme = (themeId) => {
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      setCardData((prev) => ({
        ...prev,
        theme: themeId,
        backgroundColor: theme.bg,
        accentColor: theme.accent,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  戻る
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Sun className="w-6 h-6 text-orange-400" />
                <span className="text-lg font-bold text-gray-800">名刺エディター(デモ)</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl p-1 shadow-sm">
                <TabsTrigger
                  value="basic"
                  className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-green-400 data-[state=active]:text-white"
                >
                  <User className="w-4 h-4" />
                  基本情報
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-green-400 data-[state=active]:text-white"
                >
                  <Palette className="w-4 h-4" />
                  デザイン
                </TabsTrigger>
                <TabsTrigger
                  value="links"
                  className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-green-400 data-[state=active]:text-white"
                >
                  <LinkIcon className="w-4 h-4" />
                  リンク
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card className="border-0 shadow-lg bg-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-500" />
                      基本情報
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">お名前</Label>
                      <Input
                        id="name"
                        value={cardData.name}
                        onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="お名前を入力してください"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">肩書き・職業</Label>
                      <Input
                        id="title"
                        value={cardData.title}
                        onChange={(e) => setCardData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="肩書き・職業を入力してください"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        value={cardData.email}
                        onChange={(e) => setCardData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="メールアドレスを入力してください"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input
                        id="phone"
                        value={cardData.phone}
                        onChange={(e) => setCardData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="電話番号を入力してください"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                        
                      <Label htmlFor="bio">自己紹介</Label>
                      <Textarea
                        id="bio"
                        value={cardData.bio}
                        onChange={(e) => setCardData((prev) => ({ ...prev, bio: e.target.value }))}
                        placeholder="あなたの魅力を伝える自己紹介文を書いてください"
                        rows={4}
                        className="rounded-xl"
                      />
                    </div>
                    
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-4">
                <Card className="border-0 shadow-lg bg-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-green-500" />
                      テーマ選択
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => updateTheme(theme.id)}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            cardData.theme === theme.id
                              ? "border-orange-400 shadow-lg scale-105"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          style={{ backgroundColor: theme.bg }}
                        >
                          <div className="text-2xl mb-2">{theme.icon}</div>
                          <div className="w-full h-6 rounded-lg mb-2" style={{ backgroundColor: theme.accent }} />
                          <span className="text-sm font-medium">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="links" className="space-y-4">
                <Card className="border-0 shadow-lg bg-white rounded-2xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-green-500" />
                        リンク管理
                      </CardTitle>
                      <Button onClick={addLink} size="sm" variant="outline" className="rounded-full">
                        <Plus className="w-4 h-4 mr-2" />
                        追加
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cardData.links.map((link) => (
                      <div
                        key={link.id}
                        className="p-4 border rounded-2xl space-y-3 bg-gradient-to-r from-orange-50 to-green-50"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="rounded-full">
                            {link.icon}
                          </Badge>
                          <Button
                            onClick={() => removeLink(link.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 rounded-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={link.title}
                            onChange={(e) => updateLink(link.id, "title", e.target.value)}
                            placeholder={"URLの名前を付けてください"}
                            className={link.icon !== "website" ? "hidden" : "rounded-xl"}
                          />
                          <Input
                            value={link.url}
                            onChange={(e) => updateLink(link.id, "url", e.target.value)}
                            placeholder={link.icon === "mail" ? "メールアドレスを入力" : `${link.icon}へのurlを入力してください`}
                            className="rounded-xl"
                            type={link.icon === "mail" ? "email" : "url"}
                          />
                          <Select value={link.icon} onValueChange={(value) => updateLink(link.id, "icon", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="追加するURLの種類を選択" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-300 z-10">
                              <SelectItem value="twitter">Twitter</SelectItem>
                              <SelectItem value="instagram">Instagram</SelectItem>
                              <SelectItem value="linkedin">LinkedIn</SelectItem>
                              <SelectItem value="github">GitHub</SelectItem>
                              <SelectItem value="website">Website</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center justify-center">
                  <Eye className="w-5 h-5 text-orange-500" />
                  プレビュー
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DigitalCard data={cardData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}