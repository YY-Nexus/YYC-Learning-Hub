import { render, screen, fireEvent } from "@testing-library/react"
import { useRouter } from "next/navigation"
import BrandHeader from "@/components/brand-header"
import jest from "jest" // Declare the jest variable

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// Mock Next.js Image component
jest.mock("next/image", () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src || "/placeholder.svg"} alt={alt} {...props} />
  }
})

const mockPush = jest.fn()
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

describe("BrandHeader", () => {
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

  it("渲染品牌Logo和标题", () => {
    render(<BrandHeader />)

    expect(screen.getByAltText("YanYu Logo")).toBeInTheDocument()
    expect(screen.getByText("YanYu Smart Cloud³")).toBeInTheDocument()
    expect(screen.getByText("Learning Hub")).toBeInTheDocument()
  })

  it("不同尺寸下正确渲染", () => {
    // 测试默认尺寸
    const { rerender } = render(<BrandHeader />)
    let logo = screen.getByAltText("YanYu Logo")
    expect(logo).toHaveClass("w-10", "h-10")

    // 测试小尺寸
    rerender(<BrandHeader size="sm" />)
    logo = screen.getByAltText("YanYu Logo")
    expect(logo).toHaveClass("w-8", "h-8")

    // 测试大尺寸
    rerender(<BrandHeader size="lg" />)
    logo = screen.getByAltText("YanYu Logo")
    expect(logo).toHaveClass("w-12", "h-12")
  })

  it("渐变背景正确应用", () => {
    render(<BrandHeader />)

    const header = screen.getByRole("banner")
    expect(header).toHaveClass("bg-gradient-to-r", "from-blue-600", "via-indigo-600", "to-purple-600")
  })

  it("响应式文字大小正确", () => {
    render(<BrandHeader />)

    const mainTitle = screen.getByText("YanYu Smart Cloud³")
    expect(mainTitle).toHaveClass("text-lg", "md:text-xl", "lg:text-2xl")

    const subtitle = screen.getByText("Learning Hub")
    expect(subtitle).toHaveClass("text-sm", "md:text-base")
  })

  it("点击Logo跳转到首页", () => {
    render(<BrandHeader />)

    const logoButton = screen.getByRole("button", { name: /返回首页/ })
    fireEvent.click(logoButton)

    expect(mockPush).toHaveBeenCalledWith("/")
  })

  it("支持键盘导航", () => {
    render(<BrandHeader />)

    const logoButton = screen.getByRole("button", { name: /返回首页/ })
    logoButton.focus()

    fireEvent.keyDown(logoButton, { key: "Enter" })
    expect(mockPush).toHaveBeenCalledWith("/")

    fireEvent.keyDown(logoButton, { key: " " })
    expect(mockPush).toHaveBeenCalledTimes(2)
  })

  it("具备正确的无障碍属性", () => {
    render(<BrandHeader />)

    const header = screen.getByRole("banner")
    expect(header).toBeInTheDocument()

    const logoButton = screen.getByRole("button")
    expect(logoButton).toHaveAttribute("aria-label", "返回首页")
    expect(logoButton).toHaveAttribute("type", "button")
  })

  it("国际化文案正确显示", () => {
    render(<BrandHeader />)

    // 检查中文品牌名称
    expect(screen.getByText("YanYu Smart Cloud³")).toBeInTheDocument()
    expect(screen.getByText("Learning Hub")).toBeInTheDocument()
  })

  it("Logo图片加载失败时有备用方案", () => {
    render(<BrandHeader />)

    const logo = screen.getByAltText("YanYu Logo")

    // 模拟图片加载失败
    fireEvent.error(logo)

    // 应该仍然显示alt文本
    expect(logo).toHaveAttribute("alt", "YanYu Logo")
  })

  it("在移动端正确显示", () => {
    // 模拟移动端视口
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(<BrandHeader />)

    const header = screen.getByRole("banner")
    expect(header).toHaveClass("px-4", "py-3")
  })

  it("渐变效果在不同主题下正确显示", () => {
    // 测试浅色主题
    render(<BrandHeader />)
    let header = screen.getByRole("banner")
    expect(header).toHaveClass("from-blue-600", "via-indigo-600", "to-purple-600")

    // 测试深色主题（如果支持）
    document.documentElement.classList.add("dark")
    render(<BrandHeader />)
    header = screen.getByRole("banner")
    expect(header).toHaveClass("from-blue-600", "via-indigo-600", "to-purple-600")
  })
})
