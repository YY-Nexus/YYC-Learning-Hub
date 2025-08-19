import { render, screen, waitFor } from "@testing-library/react"
import { useRouter } from "next/navigation"
import Dashboard from "@/app/page"
import { useCourses } from "@/app/lib/hooks/useCourses"
import { useUser } from "@/app/lib/hooks/useUser"
import jest from "jest" // Declare the jest variable

// Mock hooks
jest.mock("@/app/lib/hooks/useCourses")
jest.mock("@/app/lib/hooks/useUser")
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

const mockUseCourses = useCourses as jest.MockedFunction<typeof useCourses>
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

const mockCourses = [
  {
    id: "ai-basics",
    title: "AI基础入门",
    description: "从零开始学习人工智能基础概念",
    category: "基础课程",
    level: "beginner" as const,
    duration: "4周",
    price: 299,
    rating: 4.8,
    students: 1250,
    instructor: "张教授",
    image: "/images/ai-basics-course.png",
    tags: ["AI基础", "机器学习", "入门"],
    chapters: [],
  },
  {
    id: "prompt-engineering",
    title: "提示词工程",
    description: "掌握AI对话的艺术，提升AI交互效果",
    category: "实用技能",
    level: "intermediate" as const,
    duration: "3周",
    price: 399,
    rating: 4.9,
    students: 890,
    instructor: "李专家",
    image: "/images/prompt-engineering-course.png",
    tags: ["提示词", "ChatGPT", "实战"],
    chapters: [],
  },
]

const mockUser = {
  id: "user-001",
  name: "学习者",
  email: "learner@example.com",
  avatar: "/images/default-avatar.png",
  level: "中级学习者",
  points: 1250,
  streak: 7,
  joinDate: "2024-01-15",
  completedCourses: 3,
  totalStudyTime: 45,
  certificates: [],
  progress: {
    "ai-basics": { completed: true, progress: 100, lastAccessed: "2024-02-20" },
    "prompt-engineering": { completed: false, progress: 65, lastAccessed: "2024-03-01" },
  },
  preferences: {
    notifications: true,
    emailUpdates: true,
    theme: "light" as const,
    language: "zh-CN",
  },
}

describe("Dashboard", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    })
  })

  it("正确渲染用户欢迎信息", async () => {
    mockUseUser.mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: mockCourses,
      loading: false,
      error: null,
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText("欢迎回来，学习者！")).toBeInTheDocument()
      expect(screen.getByText("继续您的AI学习之旅")).toBeInTheDocument()
    })
  })

  it("正确显示学习统计数据", async () => {
    mockUseUser.mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: mockCourses,
      loading: false,
      error: null,
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText("1,250")).toBeInTheDocument() // 积分
      expect(screen.getByText("3")).toBeInTheDocument() // 完成课程
      expect(screen.getByText("7")).toBeInTheDocument() // 连续学习天数
      expect(screen.getByText("45")).toBeInTheDocument() // 学习时长
    })
  })

  it("正确渲染课程卡片", async () => {
    mockUseUser.mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: mockCourses,
      loading: false,
      error: null,
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText("AI基础入门")).toBeInTheDocument()
      expect(screen.getByText("提示词工程")).toBeInTheDocument()
      expect(screen.getByText("张教授")).toBeInTheDocument()
      expect(screen.getByText("李专家")).toBeInTheDocument()
    })
  })

  it("显示课程学习进度", async () => {
    mockUseUser.mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: mockCourses,
      loading: false,
      error: null,
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    render(<Dashboard />)

    await waitFor(() => {
      // 检查进度条是否显示
      expect(screen.getByText("100%")).toBeInTheDocument() // AI基础入门已完成
      expect(screen.getByText("65%")).toBeInTheDocument() // 提示词工程进行中
    })
  })

  it("处理加载状态", () => {
    mockUseUser.mockReturnValue({
      user: null,
      loading: true,
      error: null,
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: [],
      loading: true,
      error: null,
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    render(<Dashboard />)

    // 应该显示骨架屏或加载指示器
    expect(screen.getByTestId("dashboard-loading")).toBeInTheDocument()
  })

  it("处理错误状态", async () => {
    mockUseUser.mockReturnValue({
      user: null,
      loading: false,
      error: "获取用户信息失败",
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: [],
      loading: false,
      error: "获取课程列表失败",
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText("获取用户信息失败")).toBeInTheDocument()
      expect(screen.getByText("获取课程列表失败")).toBeInTheDocument()
    })
  })

  it("课程卡片交互正确", async () => {
    const mockPush = jest.fn()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    })

    mockUseUser.mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: mockCourses,
      loading: false,
      error: null,
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    render(<Dashboard />)

    await waitFor(() => {
      const courseCard = screen.getByText("AI基础入门").closest("div")
      expect(courseCard).toBeInTheDocument()
    })
  })

  it("学习路径正确显示", async () => {
    mockUseUser.mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: mockCourses,
      loading: false,
      error: null,
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText("推荐学习路径")).toBeInTheDocument()
    })
  })

  it("响应式布局正确", async () => {
    mockUseUser.mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
      updateUser: jest.fn(),
      updateProgress: jest.fn(),
    })

    mockUseCourses.mockReturnValue({
      courses: mockCourses,
      loading: false,
      error: null,
      refetch: jest.fn(),
      fetchCourse: jest.fn(),
    })

    // 模拟移动端视口
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(<Dashboard />)

    await waitFor(() => {
      const container = screen.getByTestId("dashboard-container")
      expect(container).toHaveClass("px-4")
    })
  })
})
