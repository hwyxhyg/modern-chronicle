# GSAP ScrollTrigger 水平滚动使用说明

## 概述

本项目使用 GSAP (GreenSock Animation Platform) 和 ScrollTrigger 插件创建了水平滚动效果。

## GSAP 核心概念

### 1. ScrollTrigger 插件注册

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

### 2. 水平滚动实现原理

水平滚动通过以下方式实现：

1. **容器固定 (Pin)**: 使用 `pin: true` 将容器固定在视口中
2. **水平移动**: 通过 `gsap.to()` 动画水平移动内容容器
3. **滚动关联**: 使用 `scrub: 1` 将滚动位置与动画进度关联

### 3. 关键配置说明

```typescript
const horizontalScrollTween = gsap.to(wrapper, {
  x: () => -getScrollWidth(), // 水平移动距离
  ease: 'none', // 必须使用线性缓动
  scrollTrigger: {
    trigger: container, // 触发元素
    start: 'top top', // 开始位置
    end: () => `+=${getScrollWidth()}`, // 结束位置（动态计算）
    pin: true, // 固定容器
    scrub: 1, // 滚动与动画同步
    invalidateOnRefresh: true, // 刷新时重新计算
    anticipatePin: 1, // 预判固定，提升性能
  },
});
```

### 4. 重要注意事项

- **ease: "none"**: 水平滚动动画必须使用线性缓动，否则会出现不流畅的效果
- **动态计算宽度**: 使用函数 `() => -getScrollWidth()` 确保响应式布局正确
- **清理资源**: 组件卸载时必须清理 ScrollTrigger 实例，避免内存泄漏
- **窗口大小变化**: 监听 `resize` 事件并调用 `ScrollTrigger.refresh()` 更新

## 组件结构

### HorizontalScroll 组件

主容器组件，负责：

- 注册 ScrollTrigger
- 创建水平滚动动画
- 管理生命周期和清理

### HorizontalSection 组件

内容区块组件，用于：

- 定义每个水平滚动区块
- 设置区块宽度（通常为 `100vw`）
- 自定义样式和内容

## 使用示例

```tsx
<HorizontalScroll>
  <HorizontalSection width="100vw" className="bg-blue-600">
    <div>第一部分内容</div>
  </HorizontalSection>

  <HorizontalSection width="100vw" className="bg-purple-600">
    <div>第二部分内容</div>
  </HorizontalSection>
</HorizontalScroll>
```

## 参考文档

- [GSAP 官方文档](https://gsap.com/docs/v3/)
- [ScrollTrigger 插件文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [水平滚动最佳实践](https://gsap.com/docs/v3/Plugins/ScrollTrigger/#horizontal-scrolling)
