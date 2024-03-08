import { AbsoluteFill, Sequence, useCurrentFrame, Img } from "remotion";

import { loadFont, fontFamily } from "@remotion/google-fonts/NotoSansTC";
import React, { useMemo } from "react";
import { TextFade } from "./TextFade";
import { Staff } from "./List/Staff";
import { Sponsor } from "./List/Sponsor";
import { Poster } from "./List/Poster";
import { Speaker } from "./List/Speaker";
import { Novatrix } from "../novatrix";
import { Donate } from "./List/Donate";
loadFont();

const container: React.CSSProperties = {
  backgroundColor: "#F8F3E8",
  position: "relative",
  fontFamily,
};

export const Main = () => {
  const frame = useCurrentFrame();
  const titleStyle: React.CSSProperties = useMemo(() => {
    return { fontSize: 128 };
  }, []);

  return (
    <AbsoluteFill style={container}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#F8F3E8",
          zIndex: 0,
          opacity: 0.25,
        }}
      >
        <Novatrix frame={frame} key={frame} />
      </div>
      <Sequence>
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        >
          <Img
            src="https://sitcon.org/2024/logo_2024.png"
            style={{
              width: 200,
            }}
          />
        </div>
      </Sequence>
      <Sequence durationInFrames={80}>
        <TextFade>
          <h1 style={titleStyle}>工作人員</h1>
        </TextFade>
      </Sequence>

      <Sequence durationInFrames={400 * 10 + 800 + 30} from={80}>
        <Staff />
      </Sequence>

      <Sequence durationInFrames={80} from={4560}>
        <TextFade>
          <h1 style={titleStyle}>議程講者</h1>
        </TextFade>
      </Sequence>

      <Sequence durationInFrames={800} from={4560 + 80}>
        <Speaker />
      </Sequence>

      <Sequence durationInFrames={80} from={5440}>
        <TextFade>
          <h1 style={titleStyle}>海報作者</h1>
        </TextFade>
      </Sequence>

      <Sequence durationInFrames={300} from={5440 + 80}>
        <Poster />
      </Sequence>

      <Sequence durationInFrames={80} from={5820}>
        <TextFade>
          <h1 style={titleStyle}>合作夥伴</h1>
        </TextFade>
      </Sequence>

      <Sequence durationInFrames={9 * 300 + 30} from={5900}>
        <Sponsor />
      </Sequence>

      <Sequence durationInFrames={80} from={8400}>
        <TextFade>
          <h1 style={titleStyle}>個人贊助</h1>
        </TextFade>
      </Sequence>

      <Sequence durationInFrames={300} from={8400 + 80}>
        <Donate />
      </Sequence>
    </AbsoluteFill>
  );
};
