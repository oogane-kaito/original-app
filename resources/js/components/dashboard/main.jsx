"use client";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Leaf,
  Sun,
  Users,
  Eye,
  Heart,
  Calendar,
  TrendingUp,
  UserPlus,
  ArrowLeft,
  Search,
  Filter,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// サンプルデータ
const exchangeHistory = [
  {
    id: "1",
    name: "佐藤 みどり",
    title: "小学校の先生",
    avatar: "/placeholder.svg?height=40&width=40",
    exchangedAt: "2024-01-15",
    location: "学校の文化祭",
    mutual: true,
    views: 12,
  },
  {
    id: "2",
    name: "田中 太陽",
    title: "サッカーコーチ",
    avatar: "/placeholder.svg?height=40&width=40",
    exchangedAt: "2024-01-10",
    location: "サッカー教室",
    mutual: false,
    views: 8,
  },
  {
    id: "3",
    name: "山田 花音",
    title: "ピアノの先生",
    avatar: "/placeholder.svg?height=40&width=40",
    exchangedAt: "2024-01-08",
    location: "音楽発表会",
    mutual: true,
    views: 15,
  },
  {
    id: "4",
    name: "鈴木 空",
    title: "絵画教室の生徒",
    avatar: "/placeholder.svg?height=40&width=40",
    exchangedAt: "2024-01-05",
    location: "絵画展示会",
    mutual: true,
    views: 6,
  },
];

const stats = {
  totalExchanges: 24,
  totalViews: 156,
  thisMonthExchanges: 8,
  favoriteCount: 12,
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredHistory = exchangeHistory.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  ホーム
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Sun className="w-6 h-6 text-orange-400" />
                <span className="text-lg font-bold text-gray-800">マイダッシュボード</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/editor">
                <Button size="sm" className="bg-gradient-to-r from-orange-400 to-green-400 text-white rounded-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  名刺を作る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-100 to-green-100 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="bg-gradient-to-r from-orange-400 to-green-400 text-white text-xl">
                  花
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">おかえりなさい、花子さん！</h1>
                <p className="text-gray-600">今日も素敵な出会いがありますように 🌻</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl p-1 shadow-sm">
            <TabsTrigger
              value="overview"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-green-400 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              概要
            </TabsTrigger>
            <TabsTrigger
              value="exchanges"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-green-400 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              交換履歴
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-green-400 data-[state=active]:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              分析
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalExchanges}</div>
                  <div className="text-sm text-gray-600">総交換数</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalViews}</div>
                  <div className="text-sm text-gray-600">総閲覧数</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats.thisMonthExchanges}</div>
                  <div className="text-sm text-gray-600">今月の交換</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats.favoriteCount}</div>
                  <div className="text-sm text-gray-600">お気に入り</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  最近の活動
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exchangeHistory.slice(0, 3).map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-green-50"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{person.name}</div>
                        <div className="text-sm text-gray-600">{person.location}</div>
                      </div>
                      <div className="text-sm text-gray-500">{person.exchangedAt}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exchanges" className="space-y-6">
            {/* Search and Filter */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="名前や職業で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-xl border-gray-200"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    フィルター
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Exchange History */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  交換履歴 ({filteredHistory.length}件)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredHistory.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 transition-all"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-orange-400 to-green-400 text-white">
                          {person.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-800">{person.name}</span>
                          {person.mutual && <Badge className="bg-green-100 text-green-700 text-xs">相互交換</Badge>}
                        </div>
                        <div className="text-sm text-gray-600">{person.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {person.location} • {person.exchangedAt}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                          <Eye className="w-4 h-4" />
                          {person.views}
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    月別交換数
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>グラフを表示予定</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-500" />
                    閲覧数推移
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Eye className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>グラフを表示予定</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Connections */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-500" />
                  人気の交換相手
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exchangeHistory
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((person, index) => (
                      <div
                        key={person.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-green-50"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{person.name}</div>
                          <div className="text-sm text-gray-600">{person.title}</div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          {person.views}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}