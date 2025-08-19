import { ResponsiveLayout } from "@/components/responsive-layout"

export default function ExamPage() {
  return (
    <ResponsiveLayout
      title="练习测试"
      user={{
        name: "张同学",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "中级工程师",
      }}
    >
      {/* 现有的考试页面内容 */}
    </ResponsiveLayout>
  )
}
