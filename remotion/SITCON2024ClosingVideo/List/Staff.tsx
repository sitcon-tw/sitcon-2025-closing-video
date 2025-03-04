import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import React from "react";
import StaffData from "../../Data/staff.json";
import { UsersRound } from "lucide-react";
const GroupDescriptionLetter = ({
  text,
  index,
}: {
  text: string;
  index: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [index * 2 + 30, index * 2 + 40], [0, 1]);
  const blur = Math.max(
    interpolate(frame, [index * 2 + 30, index * 2 + 40], [5, 0]),
    0
  );

  return (
    <span
      style={{
        opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      {text}
    </span>
  );
};
const GroupDescription = ({ text }: { text: string }) => {
  return (
    <p
      style={{
        fontSize: 36,
        width: "100%",
        textAlign: "left",
        margin: 0,
      }}
    >
      {text.split("").map((letter, index) => (
        <GroupDescriptionLetter text={letter} index={index} key={index} />
      ))}
    </p>
  );
};
const StaffItem = ({ member, index, many }: any) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [index * 5 + 30, index * 5 + 60], [0, 1]);
  const y = interpolate(frame, [30, 60], many ? [300, 280] : [100, 80]);
  const blur = Math.max(
    interpolate(frame, [index * 5 + 30, index * 5 + 60], [10, 0]),
    0
  );
  const scale = Math.min(
    interpolate(frame, [index * 5 + 30, index * 5 + 60], [0.5, 1]),
    1
  );

  return (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "128px",
        opacity,
        transform: `translateY(${y}px)`,
        filter: `blur(${blur}px)`,
      }}
    >
      <Img
        src={`https://www.gravatar.com/avatar/${member.email}?s=512&d=https://sitcon.org/2022/imgs/deafult_avatar.jpg&r=g`}
        style={{
          width: 128,
          height: 128,
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
          transform: `scale(${scale})`,
        }}
        maxRetries={6}
      />
      <div
        style={{
          fontSize: 24,
          textAlign: "center",
          wordBreak: "break-all",
          marginTop: 12,
        }}
      >
        {member.name}
      </div>
      <div
        style={{
          fontSize: 18,
          textAlign: "center",
          opacity: 0.5,
        }}
      >
        {member.role}
      </div>
    </div>
  );
};

export const Staff = () => {
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
        {StaffData.map((group, index) => (
          <>
            <TransitionSeries.Sequence
              durationInFrames={group.group === "場務組" ? 800 : 400}
              key={index}
            >
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "1920px",
                  height: "1080px",
                  padding: "24px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    width: "600px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(16px)",
                    borderRadius: "24px",
                    padding: "24px",
                    height: `calc(100% - 48px * 2)`,
                    boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
                    position: "relative",
                  }}
                >
                  <h1
                    style={{
                      fontSize: 64,
                      width: "100%",
                      textAlign: "left",
                      margin: 0,
                    }}
                    id={group.group}
                  >
                    {group.group}
                  </h1>

                  <GroupDescription text={group.description} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 24,
                      right: 24,
                      opacity: 0.5,
                    }}
                  >
                    <UsersRound size={128} strokeWidth={1.5} />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px 36px",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                    flexWrap: "wrap",
                    padding: "64px 0",
                  }}
                >
                  {group.staff.map((member, index) => (
                    <StaffItem
                      member={member}
                      index={index}
                      many={group.group === "場務組"}
                    />
                  ))}
                </div>
              </div>
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={slide({ direction: "from-bottom" })}
              timing={linearTiming({ durationInFrames: 30 })}
            />
          </>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
