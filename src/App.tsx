import HorizontalScroll from './components/HorizontalScroll';
import HorizontalSection from './components/HorizontalSection';
import Section1 from './components/Section1';

function App() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <HorizontalScroll>
        <Section1 />

        <HorizontalSection
          width="100vw"
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <div className="text-center text-white px-8">
            <h2 className="text-5xl font-bold mb-4">第二部分</h2>
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
    </div>
  );
}

export default App;
