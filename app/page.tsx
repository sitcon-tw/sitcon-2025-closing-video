"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React from "react";
import { Main } from "../remotion/MyComp/Main";
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Tips } from "../components/Tips/Tips";
import { Spacing } from "../components/Spacing";

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
};

const outer: React.CSSProperties = {
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  marginBottom: 40,
  marginTop: 60,
};

const player: React.CSSProperties = {
  width: "100%",
};

const Home: NextPage = () => {
  return (
    <div>
      <div style={container}>
        <div className="cinematics" style={outer}>
          <Player
            component={Main}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            controls
            autoPlay
            loop
          />
        </div>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Spacing></Spacing>
        <Tips></Tips>
      </div>
    </div>
  );
};

export default Home;
