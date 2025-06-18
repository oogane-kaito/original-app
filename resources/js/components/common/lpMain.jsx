"use client"

import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Leaf, Sun, Users, Palette, Share2, Star, Smile } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function LpMain() {

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <Sun className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-green-300 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-orange-300 rounded-full animate-ping"></div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              やさしい
            </span>
            <br />
            <span className="text-gray-800">デジタル名刺で</span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
              つながろう！
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            自然でやさしいデザインのデジタル名刺を作って、
            <br className="hidden sm:block" />
            大切な人とのつながりを育てていこう 🌱
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href={route('register')}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-300 to-green-400 hover:from-orange-500 hover:to-green-500 text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg"
              >
                <Smile className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                無料で利用する
              </Button>
            </Link>
            <Link href={route('demo')}>
                <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-orange-200 text-orange-600 hover:bg-orange-50 rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg border-2"
                >
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                サンプルを見る
                </Button>
            </Link>
            
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">デジタル名刺サイトの特徴</h2>
          <p className="text-base sm:text-lg text-gray-600">やさしく・楽しく・つながる3つのポイント</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-3xl">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">やさしいデザイン</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                自然をイメージした落ち着いたカラーで、見る人の心を和ませるデザインです
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-3xl">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">かんたんシェア</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                1つのリンクで全てをまとめて共有。お友達との交換も楽しくできます
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-3xl md:col-span-2 lg:col-span-1">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">つながりを大切に</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                交換した名刺を整理して、大切な人とのつながりを育てていけます
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fun Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="bg-gradient-to-r from-orange-100 to-green-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center mx-4 sm:mx-0">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-300 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-lg sm:text-xl lg:text-2xl">🌻</span>
              </div>
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-300 rounded-full flex items-center justify-center animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-lg sm:text-xl lg:text-2xl">🌿</span>
              </div>
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-200 rounded-full flex items-center justify-center animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                <span className="text-lg sm:text-xl lg:text-2xl">🦋</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            みんなで楽しく使おう！
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            学校のお友達、習い事の仲間、家族みんなで
            <br className="hidden sm:block" />
            素敵なデジタル名刺を作って交換しよう
          </p>
          <Link href={route('register')}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              今すぐ作ってみる
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}