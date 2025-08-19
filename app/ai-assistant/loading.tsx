export default function AIAssistantLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 页面头部骨架 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div>
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* 功能特色展示骨架 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 border">
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="w-20 h-5 bg-gray-200 rounded mx-auto mb-1 animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* 聊天界面骨架 */}
        <div className="bg-white rounded-lg shadow-xl border-0">
          <div className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full animate-pulse"></div>
              <div>
                <div className="w-32 h-5 bg-white/20 rounded animate-pulse mb-1"></div>
                <div className="w-40 h-4 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 消息列表骨架 */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${i % 2 === 0 ? "order-2" : "order-1"}`}>
                  <div className={`rounded-2xl px-4 py-3 ${i % 2 === 0 ? "bg-gray-200 ml-4" : "bg-gray-200 mr-4"}`}>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-8 h-8 bg-gray-200 rounded-full animate-pulse ${i % 2 === 0 ? "order-1 ml-2" : "order-2 mr-2"}`}
                ></div>
              </div>
            ))}
          </div>

          {/* 输入区域骨架 */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
