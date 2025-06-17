"use client"

import React, { useState, useRef, useCallback } from "react"

import {

  Plus,

  Move,

  Edit3,

  Trash2,

  Upload,

  Save,

  Eye,

  Share2,

  Copy,

  Facebook,

  Twitter,

  QrCode,

  Download,

  Globe,

} from "lucide-react"

const CustomizableLinkSite = () => {

  const [isEditMode, setIsEditMode] = useState(true)

  const [layoutMode, setLayoutMode] = useState("free") // 'free' or 'template'

  const [backgroundImage, setBackgroundImage] = useState("")

  const [showShareModal, setShowShareModal] = useState(false)

  const [showQRCode, setShowQRCode] = useState(false)

  const [pageUrl, setPageUrl] = useState("https://mysite.com/page/123") // Laravel backend would provide this

  const [pageTitle, setPageTitle] = useState("My Custom Link Page")

  const [isPublished, setIsPublished] = useState(false)

  const [widgets, setWidgets] = useState([

    {

      id: 1,

      type: "link",

      x: 50,

      y: 100,

      content: { text: "My Website", url: "https://example.com" },

    },

    {

      id: 2,

      type: "text",

      x: 50,

      y: 200,

      content: { text: "Welcome to my page!" },

    },

    {

      id: 3,

      type: "link",

      x: 50,

      y: 300,

      content: { text: "My Blog", url: "https://blog.example.com" },

    },

    {

      id: 4,

      type: "link",

      x: 50,

      y: 400,

      content: { text: "Contact", url: "mailto:hello@example.com" },

    },

  ])

  const [draggedWidget, setDraggedWidget] = useState(null)

  const [editingWidget, setEditingWidget] = useState(null)

  const fileInputRef = useRef(null)

  // 共有機能

const copyToClipboard = async (text) => {
    try {
        // Clipboard APIを使用してテキストをコピー
        await navigator.clipboard.writeText(text);
        showToast("リンクをコピーしました！"); // トースト通知を表示
    } catch (err) {
        console.error("Clipboard APIの使用に失敗しました:", err);
        showToast("コピーに失敗しました。"); // エラーメッセージを表示
    }
};

// トースト通知を表示する関数の例
const showToast = (message) => {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "black";
    toast.style.color = "white";
    toast.style.padding = "10px";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = 1000;

    document.body.appendChild(toast);
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000); // 3秒後にトースト通知を消す
};


  const shareToSocial = (platform) => {

    const encodedUrl = encodeURIComponent(pageUrl)

    const encodedTitle = encodeURIComponent(pageTitle)

    const shareUrls = {

      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,

      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,

      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,

      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,

    }

    window.open(shareUrls[platform], "_blank", "width=600,height=400")

  }

  const generateQRCode = () => {

    // QRコード生成（実際のプロジェクトではqrcode.jsなどのライブラリを使用）

    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pageUrl)}`

  }

  const savePageData = async () => {

    // Laravel backendにページデータを保存

    const pageData = {

      title: pageTitle,

      backgroundImage,

      layoutMode,

      widgets,

      isPublished,

    }

    try {

      // 実際のAPIコール例

      // const response = await fetch('/api/pages', {

      //   method: 'POST',

      //   headers: {

      //     'Content-Type': 'application/json',

      //     'Authorization': Bearer ${token}

      //   },

      //   body: JSON.stringify(pageData)

      // });

      console.log("Saving page data:", pageData)

      alert("ページを保存しました！")

    } catch (error) {

      console.error("Save error:", error)

      alert("保存に失敗しました。")

    }

  }

  const publishPage = async () => {

    setIsPublished(!isPublished)

    await savePageData()

    alert(isPublished ? "ページを非公開にしました" : "ページを公開しました！")

  }

  const exportPageAsImage = () => {

    // html2canvasライブラリを使用してページを画像として出力

    // 実装例（html2canvasが必要）

    alert("画像エクスポート機能（html2canvasライブラリが必要）")

  }

  const addWidget = (type) => {

    const newWidget = {

      id: Date.now(),

      type,

      x: Math.random() * 300 + 50,

      y: Math.random() * 200 + 100,

      content:

        type === "link"

          ? { text: "New Link", url: "https://example.com" }

          : type === "text"

            ? { text: "New Text" }

            : { src: "https://via.placeholder.com/150", alt: "Image" },

    }

    setWidgets([...widgets, newWidget])

  }

  const handleMouseDown = (e, widget) => {

    if (!isEditMode) return

    setDraggedWidget({ ...widget, offsetX: e.clientX - widget.x, offsetY: e.clientY - widget.y })

  }

  const handleMouseMove = useCallback(

    (e) => {

      if (draggedWidget) {

        const newX = e.clientX - draggedWidget.offsetX

        const newY = e.clientY - draggedWidget.offsetY

        setWidgets((widgets) =>

          widgets.map((w) =>

            w.id === draggedWidget.id

              ? {

                  ...w,

                  x: Math.max(0, Math.min(newX, window.innerWidth - 200)),

                  y: Math.max(0, Math.min(newY, window.innerHeight - 50)),

                }

              : w,

          ),

        )

      }

    },

    [draggedWidget],

  )

  const handleMouseUp = useCallback(() => {

    setDraggedWidget(null)

  }, [])

  React.useEffect(() => {

    if (draggedWidget) {

      document.addEventListener("mousemove", handleMouseMove)

      document.addEventListener("mouseup", handleMouseUp)

      return () => {

        document.removeEventListener("mousemove", handleMouseMove)

        document.removeEventListener("mouseup", handleMouseUp)

      }

    }

  }, [draggedWidget, handleMouseMove, handleMouseUp])

  const deleteWidget = (id) => {

    setWidgets(widgets.filter((w) => w.id !== id))

  }

  const updateWidget = (id, newContent) => {

    setWidgets(widgets.map((w) => (w.id === id ? { ...w, content: newContent } : w)))

    setEditingWidget(null)

  }

  const handleBackgroundUpload = (e) => {

    const file = e.target.files[0]

    if (file) {

      const reader = new FileReader()

      reader.onload = (e) => setBackgroundImage(e.target.result)

      reader.readAsDataURL(file)

    }

  }

  const WidgetComponent = ({ widget }) => {

    const isEditing = editingWidget === widget.id

    if (widget.type === "link") {

      return (

        <div className="group relative">

          {isEditing ? (

            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500">

              <input

                type="text"

                value={widget.content.text}

                onChange={(e) => updateWidget(widget.id, { ...widget.content, text: e.target.value })}

                className="block w-full mb-2 px-3 py-2 border rounded-md"

                placeholder="リンクテキスト"

              />

              <input

                type="url"

                value={widget.content.url}

                onChange={(e) => updateWidget(widget.id, { ...widget.content, url: e.target.value })}

                className="block w-full px-3 py-2 border rounded-md"

                placeholder="URL"

              />

            </div>

          ) : (

            <a

              href={isEditMode ? "#" : widget.content.url}

              onClick={(e) => isEditMode && e.preventDefault()}

              className="block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-w-[200px] text-center"

            >

              {widget.content.text}

            </a>

          )}

          {isEditMode && !isEditing && (

            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">

              <button

                onClick={() => setEditingWidget(widget.id)}

                className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"

              >

                <Edit3 size={12} />

              </button>

              <button

                onClick={() => deleteWidget(widget.id)}

                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"

              >

                <Trash2 size={12} />

              </button>

            </div>

          )}

        </div>

      )

    }

    if (widget.type === "text") {

      return (

        <div className="group relative max-w-xs">

          {isEditing ? (

            <textarea

              value={widget.content.text}

              onChange={(e) => updateWidget(widget.id, { text: e.target.value })}

              className="w-full p-3 bg-white/90 rounded-lg shadow-lg border-2 border-blue-500 resize-none"

              rows="3"

            />

          ) : (

            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-800">

              {widget.content.text}

            </div>

          )}

          {isEditMode && !isEditing && (

            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">

              <button

                onClick={() => setEditingWidget(widget.id)}

                className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"

              >

                <Edit3 size={12} />

              </button>

              <button

                onClick={() => deleteWidget(widget.id)}

                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"

              >

                <Trash2 size={12} />

              </button>

            </div>

          )}

        </div>

      )

    }

    if (widget.type === "image") {

      return (

        <div className="group relative">

          {isEditing ? (

            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500">

              <input

                type="url"

                value={widget.content.src}

                onChange={(e) => updateWidget(widget.id, { ...widget.content, src: e.target.value })}

                className="block w-full mb-2 px-3 py-2 border rounded-md"

                placeholder="画像URL"

              />

              <input

                type="text"

                value={widget.content.alt}

                onChange={(e) => updateWidget(widget.id, { ...widget.content, alt: e.target.value })}

                className="block w-full px-3 py-2 border rounded-md"

                placeholder="画像の説明"

              />

            </div>

          ) : (

            <img

              src={widget.content.src || "/placeholder.svg"}

              alt={widget.content.alt}

              className="max-w-[200px] max-h-[200px] rounded-lg shadow-lg object-cover"

            />

          )}

          {isEditMode && !isEditing && (

            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">

              <button

                onClick={() => setEditingWidget(widget.id)}

                className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"

              >

                <Edit3 size={12} />

              </button>

              <button

                onClick={() => deleteWidget(widget.id)}

                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"

              >

                <Trash2 size={12} />

              </button>

            </div>

          )}

        </div>

      )

    }

  }

  return (

    <div

      className="min-h-screen relative overflow-hidden"

      style={{

        backgroundImage: backgroundImage

          ? `url(${backgroundImage})`

          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

        backgroundSize: "cover",

        backgroundPosition: "center",

      }}

    >

      {/* ヘッダー */}

      <header className="bg-white/10 backdrop-blur-md p-4 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <h1 className="text-2xl font-bold text-white">

            {isEditMode ? (

              <input

                type="text"

                value={pageTitle}

                onChange={(e) => setPageTitle(e.target.value)}

                className="bg-transparent border-b-2 border-white/50 outline-none text-white placeholder-white/70"

                placeholder="ページタイトル"

              />

            ) : (

              pageTitle

            )}

          </h1>

          {isPublished && (

            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">

              <Globe size={12} />

              公開中

            </span>

          )}

        </div>

        <div className="flex gap-2">

          <button

            onClick={() => fileInputRef.current.click()}

            className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"

          >

            <Upload size={16} />

            背景変更

          </button>

          <select

            value={layoutMode}

            onChange={(e) => setLayoutMode(e.target.value)}

            className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"

          >

            <option value="free" className="text-black">

              自由配置

            </option>

            <option value="template" className="text-black">

              テンプレート

            </option>

          </select>

          <button

            onClick={savePageData}

            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"

          >

            <Save size={16} />

            保存

          </button>

          <button

            onClick={publishPage}

            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${

              isPublished ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"

            }`}

          >

            <Globe size={16} />

            {isPublished ? "非公開" : "公開"}

          </button>

          <button

            onClick={() => setShowShareModal(true)}

            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"

          >

            <Share2 size={16} />

            共有

          </button>

          <button

            onClick={() => setIsEditMode(!isEditMode)}

            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${

              isEditMode ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-purple-500 text-white hover:bg-purple-600"

            }`}

          >

            {isEditMode ? <Eye size={16} /> : <Edit3 size={16} />}

            {isEditMode ? "プレビュー" : "編集"}

          </button>

        </div>

      </header>

      {/* 共有モーダル */}

      {showShareModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-xl font-bold text-gray-800">ページを共有</h3>

              <button onClick={() => setShowShareModal(false)} className="text-gray-500 hover:text-gray-700">

                ✕

              </button>

            </div>

            {/* URL共有 */}

            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">ページURL</label>

              <div className="flex gap-2">

                <input type="text" value={pageUrl} readOnly className="flex-1 px-3 py-2 border rounded-lg bg-gray-50" />

                <button

                  onClick={() => copyToClipboard(pageUrl)}

                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"

                >

                  <Copy size={16} />

                  コピー

                </button>

              </div>

            </div>

            {/* ソーシャル共有 */}

            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 mb-3">ソーシャルメディアで共有</label>

              <div className="grid grid-cols-2 gap-3">

                <button

                  onClick={() => shareToSocial("twitter")}

                  className="bg-blue-400 text-white px-4 py-3 rounded-lg hover:bg-blue-500 flex items-center justify-center gap-2"

                >

                  <Twitter size={16} />

                  Twitter

                </button>

                <button

                  onClick={() => shareToSocial("facebook")}

                  className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"

                >

                  <Facebook size={16} />

                  Facebook

                </button>

                <button

                  onClick={() => shareToSocial("line")}

                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"

                >

                  📱 LINE

                </button>

                <button

                  onClick={() => shareToSocial("linkedin")}

                  className="bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2"

                >

                  💼 LinkedIn

                </button>

              </div>

            </div>

            {/* QRコード・エクスポート */}

            <div className="flex gap-3">

              <button

                onClick={() => setShowQRCode(!showQRCode)}

                className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"

              >

                <QrCode size={16} />

                QRコード

              </button>

              <button

                onClick={exportPageAsImage}

                className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"

              >

                <Download size={16} />

                画像出力

              </button>

            </div>

            {/* QRコード表示 */}

            {showQRCode && (

              <div className="mt-4 text-center">

                <img

                  src={generateQRCode() || "/placeholder.svg"}

                  alt="QR Code"

                  className="mx-auto rounded-lg shadow-lg"

                />

                <p className="text-sm text-gray-600 mt-2">QRコードをスキャンしてページにアクセス</p>

              </div>

            )}

          </div>

        </div>

      )}

      {/* 編集パネル */}

      {isEditMode && layoutMode === "free" && (

        <div className="fixed top-20 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-10">

          <h3 className="font-semibold mb-3 text-gray-800">ウィジェットを追加</h3>

          <div className="flex flex-col gap-2">

            <button

              onClick={() => addWidget("link")}

              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"

            >

              <Plus size={16} />

              リンク

            </button>

            <button

              onClick={() => addWidget("text")}

              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"

            >

              <Plus size={16} />

              テキスト

            </button>

            <button

              onClick={() => addWidget("image")}

              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"

            >

              <Plus size={16} />

              画像

            </button>

          </div>

        </div>

      )}

      {layoutMode === "template" ? (

        // テンプレートレイアウト（2カラム）

        <div className="container mx-auto px-8 py-8 max-w-6xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* 左カラム - プロフィール・テキスト */}

            <div className="space-y-6">

              {/* プロフィールセクション */}

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">

                <div className="text-center mb-4">

                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">

                    {isEditMode ? (

                      <input

                        type="text"

                        defaultValue="YN"

                        className="w-12 text-center bg-transparent border-none outline-none"

                        maxLength={2}

                      />

                    ) : (

                      "YN"

                    )}

                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mb-2">

                    {isEditMode ? (

                      <input

                        type="text"

                        defaultValue="Your Name"

                        className="text-center bg-transparent border-b-2 border-gray-300 outline-none"

                      />

                    ) : (

                      "Your Name"

                    )}

                  </h2>

                  <p className="text-gray-600">

                    {isEditMode ? (

                      <input

                        type="text"

                        defaultValue="Web Developer & Designer"

                        className="text-center bg-transparent border-b border-gray-300 outline-none"

                      />

                    ) : (

                      "Web Developer & Designer"

                    )}

                  </p>

                </div>

              </div>

              {/* テキストウィジェット */}

              {widgets

                .filter((w) => w.type === "text")

                .map((widget, index) => (

                  <div key={widget.id} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg group relative">

                    {editingWidget === widget.id ? (

                      <textarea

                        value={widget.content.text}

                        onChange={(e) => updateWidget(widget.id, { text: e.target.value })}

                        className="w-full p-3 border-2 border-blue-500 rounded-lg resize-none"

                        rows="4"

                      />

                    ) : (

                      <p className="text-gray-700 leading-relaxed">{widget.content.text}</p>

                    )}

                    {isEditMode && editingWidget !== widget.id && (

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">

                        <button

                          onClick={() => setEditingWidget(widget.id)}

                          className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"

                        >

                          <Edit3 size={12} />

                        </button>

                        <button

                          onClick={() => deleteWidget(widget.id)}

                          className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"

                        >

                          <Trash2 size={12} />

                        </button>

                      </div>

                    )}

                  </div>

                ))}

              {/* 画像ウィジェット */}

              {widgets

                .filter((w) => w.type === "image")

                .map((widget, index) => (

                  <div key={widget.id} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg group relative">

                    {editingWidget === widget.id ? (

                      <div>

                        <input

                          type="url"

                          value={widget.content.src}

                          onChange={(e) => updateWidget(widget.id, { ...widget.content, src: e.target.value })}

                          className="block w-full mb-2 px-3 py-2 border rounded-md"

                          placeholder="画像URL"

                        />

                        <input

                          type="text"

                          value={widget.content.alt}

                          onChange={(e) => updateWidget(widget.id, { ...widget.content, alt: e.target.value })}

                          className="block w-full px-3 py-2 border rounded-md"

                          placeholder="画像の説明"

                        />

                      </div>

                    ) : (

                      <img

                        src={widget.content.src || "/placeholder.svg"}

                        alt={widget.content.alt}

                        className="w-full rounded-lg object-cover max-h-64"

                      />

                    )}

                    {isEditMode && editingWidget !== widget.id && (

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">

                        <button

                          onClick={() => setEditingWidget(widget.id)}

                          className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"

                        >

                          <Edit3 size={12} />

                        </button>

                        <button

                          onClick={() => deleteWidget(widget.id)}

                          className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"

                        >

                          <Trash2 size={12} />

                        </button>

                      </div>

                    )}

                  </div>

                ))}

            </div>

            {/* 右カラム - リンク */}

            <div className="space-y-4">

              <h3 className="text-2xl font-bold text-white mb-6 text-center">Links</h3>

              {widgets

                .filter((w) => w.type === "link")

                .map((widget, index) => (

                  <div key={widget.id} className="group relative">

                    {editingWidget === widget.id ? (

                      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-blue-500">

                        <input

                          type="text"

                          value={widget.content.text}

                          onChange={(e) => updateWidget(widget.id, { ...widget.content, text: e.target.value })}

                          className="block w-full mb-2 px-3 py-2 border rounded-md"

                          placeholder="リンクテキスト"

                        />

                        <input

                          type="url"

                          value={widget.content.url}

                          onChange={(e) => updateWidget(widget.id, { ...widget.content, url: e.target.value })}

                          className="block w-full px-3 py-2 border rounded-md"

                          placeholder="URL"

                        />

                      </div>

                    ) : (

                      <a

                        href={isEditMode ? "#" : widget.content.url}

                        onClick={(e) => isEditMode && e.preventDefault()}

                        className="block bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-center group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 group-hover:text-white"

                      >

                        {widget.content.text}

                      </a>

                    )}

                    {isEditMode && editingWidget !== widget.id && (

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">

                        <button

                          onClick={() => setEditingWidget(widget.id)}

                          className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"

                        >

                          <Edit3 size={12} />

                        </button>

                        <button

                          onClick={() => deleteWidget(widget.id)}

                          className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"

                        >

                          <Trash2 size={12} />

                        </button>

                      </div>

                    )}

                  </div>

                ))}

              {/* テンプレートモードでのウィジェット追加 */}

              {isEditMode && (

                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">

                  <h4 className="text-white font-medium mb-3">要素を追加</h4>

                  <div className="flex gap-2 flex-wrap">

                    <button

                      onClick={() => addWidget("link")}

                      className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"

                    >

                      + リンク

                    </button>

                    <button

                      onClick={() => addWidget("text")}

                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"

                    >

                      + テキスト

                    </button>

                    <button

                      onClick={() => addWidget("image")}

                      className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"

                    >

                      + 画像

                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      ) : (

        // 自由配置レイアウト

        widgets.map((widget) => (

          <div

            key={widget.id}

            className={`absolute ${isEditMode ? "cursor-move" : ""}`}

            style={{ left: widget.x, top: widget.y }}

            onMouseDown={(e) => handleMouseDown(e, widget)}

          >

            {isEditMode && (

              <div className="absolute -top-3 -left-3 bg-blue-500 text-white p-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">

                <Move size={12} />

              </div>

            )}

            <WidgetComponent widget={widget} />

          </div>

        ))

      )}

      {/* 隠しファイル入力 */}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleBackgroundUpload} className="hidden" />

      {/* フッター */}

      <footer className="fixed bottom-4 right-4 text-white/80 text-sm">

        {isEditMode

          ? layoutMode === "free"

            ? "ウィジェットをドラッグして配置を変更"

            : "テンプレートモード - 背景とコンテンツを編集"

          : "カスタムリンクページ"}

      </footer>

    </div>

  )

}

export default CustomizableLinkSite