import { render, screen, fireEvent } from "@testing-library/react"
import { useRouter, usePathname } from "next/navigation"
import BottomNav from "@/components/bottom-nav"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}))

const mockPush = jest.fn()
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe("BottomNav", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    })
    mockPush.mockClear()
  })

  it("渲染所有导航项", () => {
    mockUsePathname.mockReturnValue("/")
    render(<BottomNav />)

    expect(screen.getByText("首页")).toBeInTheDocument()
    expect(screen.getByText("课程")).toBeInTheDocument()
    expect(screen.getByText("练习")).toBeInTheDocument()
    expect(screen.getByText("社区")).toBeInTheDocument()
    expect(screen.getByText("我的")).toBeInTheDocument()
  })

  it("正确显示当前选中状态", () => {
    mockUsePathname.mockReturnValue("/courses")
    render(<BottomNav />)

    const coursesButton = screen.getByRole("button", { name: /课程/ })
    expect(coursesButton).toHaveAttribute("aria-current", "page")
    expect(coursesButton).toHaveClass("text-blue-600")
  })

  it("点击导航项时正确跳转", () => {
    mockUsePathname.mockReturnValue("/")
    render(<BottomNav />)

    const coursesButton = screen.getByRole("button", { name: /课程/ })
    fireEvent.click(coursesButton)

    expect(mockPush).toHaveBeenCalledWith("/courses")
  })

  it("具备正确的无障碍属性", () => {
    mockUsePathname.mockReturnValue("/practice")
    render(<BottomNav />)

    const nav = screen.getByRole("navigation")
    expect(nav).toHaveAttribute("aria-label", "主导航")

    const practiceButton = screen.getByRole("button", { name: /练习/ })
    expect(practiceButton).toHaveAttribute("aria-current", "page")
    expect(practiceButton).toHaveAttribute("aria-label", "练习 - 当前页面")
  })

  it("在桌面端隐藏", () => {
    mockUsePathname.mockReturnValue("/")
    render(<BottomNav />)

    const nav = screen.getByRole("navigation")
    expect(nav).toHaveClass("md:hidden")
  })

  it("支持键盘导航", () => {
    mockUsePathname.mockReturnValue("/")
    render(<BottomNav />)

    const coursesButton = screen.getByRole("button", { name: /课程/ })
    coursesButton.focus()

    fireEvent.keyDown(coursesButton, { key: "Enter" })
    expect(mockPush).toHaveBeenCalledWith("/courses")

    fireEvent.keyDown(coursesButton, { key: " " })
    expect(mockPush).toHaveBeenCalledTimes(2)
  })

  it("路径匹配逻辑正确", () => {
    // 测试子路径匹配
    mockUsePathname.mockReturnValue("/courses/ai-basics")
    render(<BottomNav />)

    const coursesButton = screen.getByRole("button", { name: /课程/ })
    expect(coursesButton).toHaveAttribute("aria-current", "page")
  })

  it("图标正确渲染", () => {
    mockUsePathname.mockReturnValue("/")
    render(<BottomNav />)

    // 检查图标是否存在（通过类名或测试ID）
    expect(screen.getByTestId("home-icon")).toBeInTheDocument()
    expect(screen.getByTestId("book-icon")).toBeInTheDocument()
    expect(screen.getByTestId("target-icon")).toBeInTheDocument()
    expect(screen.getByTestId("users-icon")).toBeInTheDocument()
    expect(screen.getByTestId("user-icon")).toBeInTheDocument()
  })

  it("响应式行为正确", () => {
    mockUsePathname.mockReturnValue("/")

    // 模拟移动端视口
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(<BottomNav />)
    const nav = screen.getByRole("navigation")
    expect(nav).toBeVisible()
  })
})
