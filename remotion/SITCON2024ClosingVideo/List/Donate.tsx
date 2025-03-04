import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { HandCoins } from "lucide-react";
const NameItem = ({ author, index }: { author: string; index: number }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [index * 5 + 30, index * 5 + 60], [0, 1]);
  const y = interpolate(frame, [0, 30], [100, 80]);
  const blur = Math.max(
    interpolate(frame, [index * 5 + 30, index * 5 + 60], [10, 0]),
    0
  );
  return (
    <div>
      <div
        style={{
          fontSize: "32px",
          opacity,
          transform: `translateY(${y}px)`,
          filter: `blur(${blur}px)`,
          marginTop: 8,
        }}
      >
        {author}
      </div>
    </div>
  );
};

export const Donate = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 30], [100, 80]);
  const authors = [
    "林＊祥",
    "王＊雲",
    "張＊沛",
    "鄭＊霖",
    "林＊淵",
    "吳＊漢",
    "詹＊耀",
    "呂＊儒",
    "陳＊賀",
    "鄭＊仁",
    "張＊懷",
    "胡＊恩",
    "傅＊雅",
  ];

  return (
    <AbsoluteFill
      style={{
        boxSizing: "border-box",
      }}
    >
      <TransitionSeries>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence
          durationInFrames={400}
          style={{ margin: "24px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "1920px",
            }}
          >
            <h1
              style={{
                fontSize: 64,
                textAlign: "center",
                margin: 0,
                transform: `translateY(${y}px)`,
              }}
            >
              <HandCoins size={96} />
              <br />
              個人贊助
            </h1>
            {authors.map((author, index) => (
              <NameItem author={author} index={index} />
            ))}
          </div>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 30 })}
        />
      </TransitionSeries>
    </AbsoluteFill>
  );
};
