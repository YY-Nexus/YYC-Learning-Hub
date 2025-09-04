"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Award, User, BarChart2 } from "lucide-react"

function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "首页",
      href: "/",
      icon: Home,
      description: "返回首页查看学习概览",
    },
    {
      name: "课程",
      href: "/courses",
      icon: BookOpen,
      description: "浏览和学习AI课程",
    },
    {
      name: "考试",
      href: "/exam",
      icon: Award,
      description: "参加专业考试和测试",
    },
    {
      name: "职业路径",
      href: "/career-path",
      icon: BarChart2,
      description: "查看AI工程师职业发展路径",
    },
    {
      name: "我的",
      href: "/profile",
      icon: User,
      description: "查看个人资料和设置",
    },
  ]

  return (
    <>
      {/* 底部导航栏 - 强制显示在移动端 */}
      <nav
        className="bottom-nav fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-lg block md:hidden"
        role="navigation"
        aria-label="底部导航"
        data-bottom-nav="true"
        style={{
          display: "flex !important",
          visibility: "visible !important",
          opacity: "1 !important",
          position: "fixed !important",
          bottom: "0 !important",
          left: "0 !important",
          right: "0 !important",
          zIndex: "9999 !important",
          backgroundColor: "white !important",
          borderTop: "1px solid #e5e7eb !important",
          boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1) !important",
        }}
      >
        <div className="flex justify-around items-center h-16 px-2 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const IconComponent = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-1 rounded-lg transition-all duration-200 touch-target ${
                  isActive ? "text-blue-600 bg-blue-100" : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
                }`}
                aria-label={item.description}
                aria-current={isActive ? "page" : undefined}
              >
                <IconComponent className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default BottomNav
export { BottomNav }
