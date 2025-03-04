import styles from "./styles.module.css";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import React from "react";
import { useEffect, useRef } from "react";

interface NovatrixProps {
  frame: number;
}

export function Novatrix(props: NovatrixProps) {
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctnDom.current) {
      return;
    }

    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
    }
    window.addEventListener("resize", resize, false);
    resize();

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: `
      attribute vec2 uv;
      attribute vec2 position;

      varying vec2 vUv;

      void main() {
          vUv = uv;
          gl_Position = vec4(position, 0, 1);
      }`,
      fragment: `precision highp float;

      uniform float uTime;
      uniform vec3 uColor;
      uniform vec3 uResolution;

      varying vec2 vUv;

      // 改進的噪聲函數
      float noise(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
          float mr = min(uResolution.x, uResolution.y);
          vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

          // 增強的細緻動態噪點
          float staticNoise1 = noise(uv * 150.0 + uTime * 12.0) * 0.15;
          float staticNoise2 = noise(uv * 100.0 - uTime * 8.0) * 0.12;
          float staticNoise3 = noise(uv * 200.0 + uTime * 15.0) * 0.1;
          float combinedNoise = staticNoise1 + staticNoise2 + staticNoise3;

          // 背景噪聲（輕微彩虹效果）
          float noiseVal = noise(uv + uTime * 0.05) * 0.1;
          vec3 noiseColor = vec3(
              noiseVal * 0.6,
              noiseVal * 0.4,
              noiseVal * 0.8
          );

          // 波形效果
          float d = -uTime * 0.5;
          float a = 0.0;
          for (float i = 0.0; i < 8.0; ++i) {
              a += cos(i - d - a * uv.x);
              d += sin(uv.y * i + a);
          }
          d += uTime * 0.5;

          vec3 waveColor = vec3(
              cos(uv.y * d) * 0.8 + 0.9,
              cos(uv.x * a) * 0.6 + 0.8,
              cos(a + d) * 0.4 + 0.9
          );

          // 混合所有效果
          vec3 col = mix(vec3(0.2, 0.4, 0.6), waveColor, 0.9);
          col = mix(col, noiseColor, 0.3);

          // 加入更強的動態噪點
          float noiseStrength = 0.35; // 增加整體噪點強度
          col += vec3(combinedNoise * noiseStrength);

          // 增加對比度
          col = pow(col, vec3(0.95));

          col = clamp(col, 0.0, 1.0);

          gl_FragColor = vec4(col, 1.0);
      }`,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
        uResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);

      program.uniforms.uTime.value = props.frame * 0.01;

      renderer.render({ scene: mesh });
    }

    animateId = requestAnimationFrame(update);

    ctn.appendChild(gl.canvas);
    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [props.frame]);

  return (
    <div
      ref={ctnDom}
      className={styles.gradientCanvas}
      style={{
        width: "100%",
        height: "100%",
      }}
      {...props}
    />
  );
}
