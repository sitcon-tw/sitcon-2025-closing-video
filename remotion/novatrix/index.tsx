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
    gl.clearColor(0.0, 0.0, 0.5, 1.0); // 深藍背景

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
      uniform vec3 uResolution;
      varying vec2 vUv;

      float grid(vec2 uv, float battery) {
          vec2 size = vec2(uv.y, uv.y * uv.y * 0.2) * 0.01;
          uv += vec2(0.0, uTime * 4.0 * (battery + 0.05));
          uv = abs(fract(uv) - 0.5);
          vec2 lines = smoothstep(size, vec2(0.0), uv);
          lines += smoothstep(size * 5.0, vec2(0.0), uv) * 0.4 * battery;
          return clamp(lines.x + lines.y, 0.0, 3.0);
      }

      void main() {
          vec2 uv = (vUv.xy * 2.0 - 1.0); // UV範圍 [-1, 1]
          float aspect = uResolution.x / uResolution.y; // 寬高比（1920/1080 ≈ 1.777）
          uv.x *= aspect; // 根據寬高比校正 X 座標

          float battery = 1.0;
          vec3 col = vec3(0.0, 0.0, 0.55); // 深藍背景

          // 網格效果，填滿整個畫面
          uv.y = 3.0 / (abs(uv.y + 0.2) + 0.05); // 縮放 Y 座標以適應網格
          uv.x *= uv.y * 1.0 / aspect; // 根據寬高比調整 X 座標
          float gridVal = grid(uv, battery);
          col = mix(col, vec3(1.0, 1.0, 1.0), gridVal); // 白色網格

          gl_FragColor = vec4(col, 1.0);
      }`,
      uniforms: {
        uTime: { value: 0 },
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
