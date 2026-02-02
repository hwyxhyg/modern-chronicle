import HorizontalScroll from './components/HorizontalScroll';
import HorizontalSection from './components/HorizontalSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 顶部介绍区域 */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-4">Modern Chronicle</h1>
          <p className="text-xl text-gray-300">水平滚动体验</p>
          <p className="text-sm text-gray-400 mt-2">向下滚动开始</p>
        </div>
      </div>

      {/* 水平滚动区域 */}
      <HorizontalScroll>
        <HorizontalSection
          width="100vw"
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <div className="text-center text-white px-8">
            <h2 className="text-5xl font-bold mb-4">第一部分</h2>
            <p className="text-xl">
              使用 GSAP ScrollTrigger 创建的水平滚动效果
            </p>
          </div>
        </HorizontalSection>

        <HorizontalSection
          width="100vw"
          className="bg-gradient-to-r from-purple-600 to-pink-600"
        >
          <div className="text-center text-white px-8">
            <h2 className="text-5xl font-bold mb-4">第二部分</h2>
            <p className="text-xl">流畅的动画和交互体验</p>
          </div>
        </HorizontalSection>

        <HorizontalSection
          width="100vw"
          className="bg-gradient-to-r from-pink-600 to-red-600"
        >
          <div className="text-center text-white px-8">
            <h2 className="text-5xl font-bold mb-4">第三部分</h2>
            <p className="text-xl">响应式设计，适配各种屏幕</p>
          </div>
        </HorizontalSection>

        <HorizontalSection
          width="100vw"
          className="bg-gradient-to-r from-red-600 to-orange-600"
        >
          <div className="text-center text-white px-8">
            <h2 className="text-5xl font-bold mb-4">第四部分</h2>
            <p className="text-xl">基于 React + TypeScript + Tailwind CSS</p>
          </div>
        </HorizontalSection>

        <HorizontalSection
          width="100vw"
          className="bg-gradient-to-r from-orange-600 to-yellow-600"
        >
          <div className="text-center text-white px-8">
            <h2 className="text-5xl font-bold mb-4">第五部分</h2>
            <p className="text-xl">高性能的动画库 GSAP</p>
          </div>
        </HorizontalSection>
      </HorizontalScroll>

      {/* 底部结束区域 */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl font-bold mb-4">感谢体验</h2>
          <p className="text-lg text-gray-300">Modern Chronicle - 现代编年史</p>
        </div>
      </div>
    </div>
  );
}

export default App;
