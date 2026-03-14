import React from 'react';
import { Z_LAYERS } from '../constants/zIndex';
import { Tooltip } from './Tooltip';

/** 2K 基准宽度，用于相对字号：2560px 下 1rem ≈ 10px → 88px = 3.4375vw, 28px = 1.09375vw */
const BASE_VIEWPORT_WIDTH = 2560;

export interface SectionTextProps {
  /** 可选标题，纯文本 */
  title?: string;
  /** 正文，纯文本或段落数组，可选 */
  body?: string | string[];
  /** 正文下方配图，可选 */
  src?: string;
  /** 标题样式，透传到 h2 */
  titleStyle?: React.CSSProperties;
  /** 正文样式，透传到包裹正文的容器（不作用于内部 p） */
  bodyStyle?: React.CSSProperties;
  /** 是否开启两端对齐（同时作用于 title 与 body）：false = 正常文档流，true = 按换行符分行并两侧对齐，默认 true */
  justify?: boolean;
  /** 配图容器样式，透传到包裹 img 的 div */
  srcStyle?: React.CSSProperties;
  /** 定位与尺寸等样式，直接透传至根节点（可写 left/top/maxWidth 等，支持 vw/vh/%） */
  style?: React.CSSProperties;
}

/** 以 2K 为基准的 vw 字号：px 值在 2560 宽下等效 */
function pxToVw(px: number): string {
  return `${(px / BASE_VIEWPORT_WIDTH) * 100}vw`;
}

function renderAnnotatedLine(line: string): React.ReactNode {
  const pattern = /\[\[(.+?)\|(.*?)\]\]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    const [raw, label, tooltipContent] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push(line.slice(lastIndex, start));
    }

    parts.push(
      <Tooltip key={`${start}-${raw}`} content={tooltipContent}>
        <span className="underline decoration-dotted underline-offset-2 cursor-help">
          {label}
        </span>
      </Tooltip>,
    );

    lastIndex = start + raw.length;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts.length > 0 ? parts : line;
}

/**
 * 全 section 通用文字展示：可选 title + 必填 body，样式通过 style 透传。
 * 字号为相对单位（以 2K 屏为基准）。
 */
export default function SectionText({
  title,
  body,
  src,
  titleStyle,
  bodyStyle,
  justify = true,
  srcStyle,
  style,
}: SectionTextProps) {
  const hasTitle = title != null && title !== '';
  const bodyParagraphs: string[] =
    body == null
      ? []
      : Array.isArray(body)
        ? body.filter((p) => p != null && p !== '')
        : body === ''
          ? []
          : [body];
  const hasBody = bodyParagraphs.length > 0;
  const hasSrc = src != null && src !== '';

  const wrapperStyle: React.CSSProperties = {
    fontSize: pxToVw(28),
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    ...(justify && { display: 'inline-block', width: 'max-content' }),
    ...bodyStyle,
  };

  return (
    <article
      className="absolute w-full max-w-full"
      style={{
        zIndex: Z_LAYERS.CONTENT,
        color: '#000', // 默认黑色，可被 style 中的 color 覆盖
        ...style,
      }}
    >
      {hasTitle && (
        <h2
          style={{
            fontSize: pxToVw(88),
            lineHeight: 1.2,
            marginBottom: pxToVw(12),
            ...titleStyle,
          }}
        >
          {justify
            ? title.split('\n').map((line, index, lines) => {
                const isLastLine = index === lines.length - 1;
                return (
                  <span
                    key={index}
                    style={{
                      display: 'block',
                      textAlign: isLastLine ? 'left' : 'justify',
                      textAlignLast: isLastLine ? 'left' : 'justify',
                    }}
                  >
                    {renderAnnotatedLine(line)}
                  </span>
                );
              })
            : title.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {renderAnnotatedLine(line)}
                </span>
              ))}
        </h2>
      )}
      {hasBody && (
        <div style={wrapperStyle}>
          {bodyParagraphs.map((para, pIndex) => (
            <p key={pIndex}>
              {justify
                ? para.split('\n').map((line, index, lines) => {
                    const isLastLine = index === lines.length - 1;
                    return (
                      <span
                        key={index}
                        style={{
                          display: 'block',
                          textAlign: isLastLine ? 'left' : 'justify',
                          textAlignLast: isLastLine ? 'left' : 'justify',
                        }}
                      >
                        {renderAnnotatedLine(line)}
                      </span>
                    );
                  })
                : renderAnnotatedLine(para)}
            </p>
          ))}
        </div>
      )}
      {hasSrc && (
        <div style={srcStyle}>
          <img src={src} alt="" className="block w-full h-auto" />
        </div>
      )}
    </article>
  );
}
