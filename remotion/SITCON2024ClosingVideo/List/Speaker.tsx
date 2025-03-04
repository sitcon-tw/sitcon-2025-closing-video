import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import SessionData from "../../Data/sessions.json";
import { Mic } from "lucide-react";

const SpeakerItem = ({ speaker, index }: any) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [index * 10 + 30, index * 10 + 60],
    [0, 1]
  );
  const y = interpolate(frame, [30, 60], [100, 80]);
  const blur = Math.max(
    interpolate(frame, [index * 10 + 30, index * 10 + 60], [10, 0]),
    0
  );
  const scale = Math.min(
    interpolate(frame, [index * 5 + 30, index * 5 + 60], [0.5, 1]),
    1
  );
  return (
    <div
      style={{
        width: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${y}px)`,
        filter: `blur(${blur}px)`,
      }}
    >
      <Img
        src={speaker.avatar}
        style={{
          width: "128px",
          height: "128px",
          borderRadius: "9999em",
          boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
        maxRetries={6}
      />
      <div
        style={{
          fontSize: "28px",
          wordBreak: "break-all",
          textAlign: "center",
          marginTop: 8,
        }}
      >
        {speaker.zh.name}
      </div>
    </div>
  );
};

export const Speaker = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [30, 60], [100, 80]);
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
          durationInFrames={800}
          style={{ margin: "24px" }}
        >
          <div style={{}}>
            <h1
              style={{
                fontSize: 64,
                textAlign: "center",
                margin: 0,
                transform: `translateY(${y}px)`,
              }}
            >
              <Mic size={96} />
              <br />
              議程講者
            </h1>
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: 24,
                marginTop: 24,
              }}
            >
              {SessionData.speakers
                .filter((x) => x.zh.name !== "" && x.zh.name !== "TBA")
                .map((x, i) => (
                  <SpeakerItem speaker={x} index={i} />
                ))}
            </div>
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
