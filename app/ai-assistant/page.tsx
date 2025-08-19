"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bot,
  Send,
  Lightbulb,
  BookOpen,
  Target,
  TrendingUp,
  Sparkles,
  Brain,
  ArrowLeft,
  Mic,
  ImageIcon,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  rating?: "up" | "down"
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "你好！我是YanYu智能学习助手🤖 我可以帮助您：\n\n• 解答AI技术问题\n• 推荐学习路径\n• 制定学习计划\n• 分析学习进度\n• 提供实战建议\n\n请告诉我您想了解什么？",
      timestamp: new Date(),
      suggestions: ["推荐适合我的课程", "制定学习计划", "解答技术问题", "分析学习进度"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("课程") || lowerInput.includes("推荐")) {
      return {
        content:
          "基于您的学习历史和兴趣，我为您推荐以下课程：\n\n🎯 **适合您的课程**\n• GPT应用开发实战 - 匹配度95%\n• Prompt工程师进阶 - 匹配度88%\n• 多模态AI应用 - 匹配度82%\n\n📊 **推荐理由**\n• 您在AI基础方面表现优秀\n• 实战项目经验需要加强\n• 符合当前行业热点需求\n\n要查看详细的学习路径吗？",
        suggestions: ["查看详细学习路径", "了解课程详情", "制定学习时间表", "查看其他推荐"],
      }
    }

    if (lowerInput.includes("计划") || lowerInput.includes("时间")) {
      return {
        content:
          "我来为您制定个性化学习计划：\n\n📅 **4周学习计划**\n\n**第1周：基础巩固**\n• GPT基础概念复习 (3小时)\n• Prompt设计原理 (4小时)\n• 实践练习 (3小时)\n\n**第2周：进阶技能**\n• 高级Prompt技巧 (5小时)\n• API集成实战 (4小时)\n• 项目实践 (3小时)\n\n**第3-4周：项目实战**\n• 完整项目开发 (8小时)\n• 代码优化 (2小时)\n• 作品展示 (2小时)\n\n⏰ **建议学习时间**：每天1-2小时，周末集中实践",
        suggestions: ["调整学习时间", "查看详细安排", "设置学习提醒", "开始第一周学习"],
      }
    }

    if (lowerInput.includes("进度") || lowerInput.includes("分析")) {
      return {
        content:
          "📊 **您的学习进度分析**\n\n**整体表现：优秀** ⭐⭐⭐⭐⭐\n\n**强项领域：**\n• AI基础理论 - 92分\n• 编程实践 - 88分\n• 项目经验 - 85分\n\n**提升空间：**\n• 深度学习算法 - 需加强\n• 模型调优技巧 - 有待提高\n• 行业应用案例 - 可以拓展\n\n**学习建议：**\n1. 继续保持理论学习优势\n2. 增加实战项目练习\n3. 关注最新技术趋势\n\n您想重点提升哪个方面？",
        suggestions: ["深度学习算法", "模型调优技巧", "行业应用案例", "制定提升计划"],
      }
    }

    return {
      content:
        "我理解您的问题。作为您的AI学习助手，我会根据您的具体需求提供个性化建议。\n\n🤖 **我的能力包括：**\n• 技术问题解答\n• 学习路径规划\n• 进度分析评估\n• 实战项目指导\n• 职业发展建议\n\n请告诉我更多详细信息，我会为您提供更精准的帮助！",
      suggestions: ["我是初学者", "我想转行AI", "提升编程技能", "准备面试"],
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleRating = (messageId: string, rating: "up" | "down") => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, rating } : msg)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回首页
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <Bot className="h-8 w-8 mr-3 text-blue-600" />
                AI学习助手
              </h1>
              <p className="text-gray-600 mt-1">智能问答 · 个性化建议 · 学习规划</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              在线
            </Badge>
          </div>
        </div>

        {/* 功能特色展示 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4 text-center">
              <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">智能问答</h3>
              <p className="text-sm text-blue-600">AI技术问题解答</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">学习规划</h3>
              <p className="text-sm text-green-600">个性化学习路径</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">进度分析</h3>
              <p className="text-sm text-purple-600">学习数据洞察</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-4 text-center">
              <Lightbulb className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">实战指导</h3>
              <p className="text-sm text-orange-600">项目实践建议</p>
            </CardContent>
          </Card>
        </div>

        {/* 聊天界面 */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-white/30">
                <AvatarImage src="/placeholder.svg?height=40&width=40&text=AI" />
                <AvatarFallback className="bg-white text-blue-600 font-bold">AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">YanYu智能助手</h3>
                <p className="text-sm text-white/80">随时为您提供学习支持</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* 消息列表 */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === "user" ? "bg-blue-600 text-white ml-4" : "bg-gray-100 text-gray-800 mr-4"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === "assistant" && (
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 ${message.rating === "up" ? "text-green-600" : "text-gray-400"}`}
                              onClick={() => handleRating(message.id, "up")}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 ${message.rating === "down" ? "text-red-600" : "text-gray-400"}`}
                              onClick={() => handleRating(message.id, "down")}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 建议按钮 */}
                    {message.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Avatar className={`h-8 w-8 ${message.type === "user" ? "order-1 ml-2" : "order-2 mr-2"}`}>
                    {message.type === "user" ? (
                      <AvatarFallback className="bg-blue-600 text-white text-sm">YY</AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                        AI
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-2xl px-4 py-3 mr-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">AI正在思考...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="border-t p-4 bg-gray-50">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="输入您的问题..."
                    className="pr-12 border-2 border-gray-200 focus:border-blue-400"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Mic className="h-3 w-3 text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ImageIcon className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* 快捷操作 */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick("推荐适合我的课程")}
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  课程推荐
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick("制定学习计划")}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  学习计划
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick("分析我的学习进度")}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  进度分析
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick("AI技术问题")}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  技术问答
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
