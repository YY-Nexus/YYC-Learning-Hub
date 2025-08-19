module.exports = {
  plugins: {
    // Tailwind CSS 核心插件
    tailwindcss: {},

    // 自动添加浏览器前缀
    autoprefixer: {},

    // CSS 嵌套支持
    "postcss-nested": {},

    // CSS 变量支持
    "postcss-custom-properties": {
      preserve: false,
      importFrom: [
        // 导入设计 tokens
        "./styles/design-tokens.css",
      ],
    },

    // CSS 导入支持
    "postcss-import": {
      path: ["./styles"],
    },

    // 生产环境优化
    ...(process.env.NODE_ENV === "production"
      ? {
          // CSS 压缩
          cssnano: {
            preset: [
              "default",
              {
                // 保留重要注释
                discardComments: {
                  removeAll: false,
                },
                // 优化字体权重
                minifyFontValues: {
                  removeQuotes: false,
                },
                // 优化选择器
                minifySelectors: true,
                // 合并规则
                mergeRules: true,
                // 移除未使用的CSS
                reduceIdents: false,
                // 优化calc()
                calc: true,
                // 优化颜色值
                colormin: true,
                // 移除重复规则
                discardDuplicates: true,
                // 移除空规则
                discardEmpty: true,
                // 移除覆盖的声明
                discardOverridden: true,
                // 移除未使用的@font-face
                discardUnused: false,
                // 合并媒体查询
                mergeMediaQueries: true,
                // 标准化字符串
                normalizeString: true,
                // 标准化URL
                normalizeUrl: true,
                // 优化背景
                reduceBackgroundRepeat: true,
                // 优化边框
                reduceBorderZero: true,
                // 优化显示值
                reduceDisplayValues: true,
                // 优化初始值
                reduceInitial: true,
                // 优化变换
                reduceTransforms: true,
                // 排序媒体查询
                sortMediaQueries: true,
                // 唯一选择器
                uniqueSelectors: true,
              },
            ],
          },

          // 移除未使用的CSS
          "@fullhuman/postcss-purgecss": {
            content: [
              "./app/**/*.{js,ts,jsx,tsx}",
              "./components/**/*.{js,ts,jsx,tsx}",
              "./pages/**/*.{js,ts,jsx,tsx}",
            ],
            defaultExtractor: (content) => {
              // 提取类名的正则表达式
              const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
              const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
              return broadMatches.concat(innerMatches)
            },
            safelist: {
              // 保护的类名
              standard: [
                /^bg-gradient-/,
                /^from-/,
                /^via-/,
                /^to-/,
                /^text-gradient/,
                /^animate-/,
                /^transition-/,
                /^duration-/,
                /^ease-/,
                /^delay-/,
                /^transform/,
                /^scale-/,
                /^rotate-/,
                /^translate-/,
                /^skew-/,
                /^origin-/,
              ],
              // 保护的深度选择器
              deep: [/^dark:/, /^hover:/, /^focus:/, /^active:/, /^disabled:/, /^group-hover:/, /^group-focus:/],
              // 保护的贪婪模式
              greedy: [/^data-/, /^aria-/, /^role-/],
            },
          },
        }
      : {}),

    // 开发环境插件
    ...(process.env.NODE_ENV === "development"
      ? {
          // CSS 语法检查
          stylelint: {
            configFile: ".stylelintrc.json",
            fix: true,
          },
        }
      : {}),
  },
}
