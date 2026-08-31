import React, { useEffect, useRef } from 'react';

interface LiquidMercuryProps {
  className?: string;
  onPointerMove?: (x: number, y: number) => void;
}

export const LiquidMercuryAnimation: React.FC<LiquidMercuryProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true }) || 
               (canvas.getContext('experimental-webgl', { antialias: true, alpha: true }) as WebGLRenderingContext | null);

    if (!gl) {
      // 2D Fallback
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let animId: number;
      let t = 0;
      const draw = () => {
        t += 0.02;
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#F8F9FA';
        ctx.fillRect(0, 0, w, h);
        
        for (let i = 1; i <= 5; i++) {
          const r = ((t * 35 + i * 50) % (w * 0.45));
          const alpha = Math.max(0, 1 - r / (w * 0.45));
          ctx.beginPath();
          ctx.ellipse(w / 2, h * 0.55, r, r * 0.4, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(17, 17, 17, ${alpha * 0.15})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        const ballY = h * 0.52 + Math.sin(t * 2) * 6;
        const ballGrad = ctx.createRadialGradient(w / 2 - 12, ballY - 12, 4, w / 2, ballY, 35);
        ballGrad.addColorStop(0, '#FFFFFF');
        ballGrad.addColorStop(0.3, '#CBD5E1');
        ballGrad.addColorStop(0.7, '#1E293B');
        ballGrad.addColorStop(1, '#0F172A');
        ctx.beginPath();
        ctx.arc(w / 2, ballY, 35, 0, Math.PI * 2);
        ctx.fillStyle = ballGrad;
        ctx.fill();

        animId = requestAnimationFrame(draw);
      };
      draw();
      return () => cancelAnimationFrame(animId);
    }

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = (position + 1.0) * 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Tailored palette seamlessly blending with #F8F9FA website base
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;

      // Studio Reflection tuned to monochrome editorial site palette (#F8F9FA / #111111)
      vec3 studioReflect(vec3 dir) {
        float y = dir.y;
        float x = dir.x;
        float z = dir.z;

        // Neutral site palette
        vec3 pageBg = vec3(0.973, 0.976, 0.980); // #F8F9FA
        vec3 lightRefl = vec3(1.0, 1.0, 1.0);
        vec3 midTone = vec3(0.78, 0.81, 0.86);
        vec3 darkInk = vec3(0.07, 0.07, 0.08); // #111111

        // Studio horizon line reflection
        float horizon = smoothstep(-0.25, 0.25, y);
        vec3 env = mix(darkInk, midTone, horizon);

        // Top softbox illumination
        float softbox = smoothstep(0.1, 0.95, y) * smoothstep(-0.85, 0.85, x);
        env = mix(env, pageBg, softbox * 0.9);

        // Specular key highlight
        vec3 lightDir = normalize(vec3(0.25, 0.88, 0.4));
        float spec = pow(max(dot(dir, lightDir), 0.0), 36.0);
        env += lightRefl * spec * 2.0;

        // Rim highlight
        vec3 rimDir = normalize(vec3(-0.35, 0.55, -0.65));
        float rimSpec = pow(max(dot(dir, rimDir), 0.0), 18.0);
        env += vec3(0.9, 0.92, 0.96) * rimSpec * 0.8;

        // Dark circular lens aperture reflection
        float ring = smoothstep(0.2, 0.0, abs(dir.z - 0.72));
        env = mix(env, darkInk, ring * 0.85);

        return env;
      }

      // Height function for ripples
      float getWaterHeight(vec2 pos, float time, vec2 mouse) {
        float d = length(pos);
        
        // Interactive mouse wave
        vec2 mPos = (mouse - 0.5) * vec2(2.2, 1.6);
        float mouseDist = length(pos - mPos);
        float mouseWave = sin(mouseDist * 18.0 - time * 5.5) * exp(-mouseDist * 2.6) * 0.035;

        // Concentric expanding liquid ripples
        float wave1 = sin(d * 14.5 - time * 3.4) / (1.0 + d * 1.35);
        float wave2 = sin(d * 21.0 - time * 4.2) * 0.35 / (1.0 + d * 2.0);
        float wave3 = cos(d * 8.0 - time * 1.8) * 0.22 / (1.0 + d * 0.95);
        
        // Smooth center depression
        float centerDip = -0.12 * exp(-d * d * 6.0) * (0.75 + 0.25 * sin(time * 2.2));

        return (wave1 + wave2 + wave3) * 0.048 + centerDip + mouseWave;
      }

      vec3 getWaterNormal(vec2 pos, float time, vec2 mouse) {
        float eps = 0.015;
        float hL = getWaterHeight(pos - vec2(eps, 0.0), time, mouse);
        float hR = getWaterHeight(pos + vec2(eps, 0.0), time, mouse);
        float hD = getWaterHeight(pos - vec2(0.0, eps), time, mouse);
        float hU = getWaterHeight(pos + vec2(0.0, eps), time, mouse);

        return normalize(vec3(hL - hR, 2.0 * eps, hD - hU));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
        
        // Dynamic camera tracking
        vec2 m = (uMouse - 0.5) * 0.18;
        vec3 ro = vec3(m.x * 0.7, 1.42 - m.y * 0.4, 1.9);
        vec3 ta = vec3(0.0, -0.06, 0.0);

        vec3 ww = normalize(ta - ro);
        vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
        vec3 vv = cross(uu, ww);

        vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.55 * ww);

        // Floating Chrome Mercury Sphere
        float floatOffset = sin(uTime * 2.2) * 0.042;
        vec3 spherePos = vec3(0.0, 0.20 + floatOffset, 0.0);
        float sphereRadius = 0.225;

        vec3 oc = ro - spherePos;
        float b = dot(oc, rd);
        float c = dot(oc, oc) - sphereRadius * sphereRadius;
        float h = b * b - c;

        // Background color of the whole page: #F8F9FA
        vec3 pageBg = vec3(0.973, 0.976, 0.980);

        if (h > 0.0) {
          float tSphere = -b - sqrt(h);
          if (tSphere > 0.0) {
            vec3 pos = ro + tSphere * rd;
            vec3 normal = normalize(pos - spherePos);
            vec3 refl = reflect(rd, normal);

            float fresnel = pow(1.0 - max(dot(-rd, normal), 0.0), 3.0);
            vec3 sphereColor = studioReflect(refl);
            sphereColor = mix(sphereColor, vec3(1.0, 1.0, 1.0), fresnel * 0.65);

            if (pos.y < spherePos.y) {
              float bounce = smoothstep(spherePos.y, spherePos.y - sphereRadius, pos.y);
              sphereColor = mix(sphereColor, vec3(0.85, 0.88, 0.92), bounce * 0.45);
            }

            gl_FragColor = vec4(sphereColor, 1.0);
            return;
          }
        }

        // Ray - Liquid Surface Plane intersection (plane y = 0)
        float tPlane = (0.0 - ro.y) / rd.y;
        if (tPlane > 0.0) {
          vec3 hitPos = ro + tPlane * rd;
          vec2 planePos = hitPos.xz;

          vec3 normal = getWaterNormal(planePos, uTime, uMouse);
          vec3 refl = reflect(rd, normal);
          vec3 waterRefl = studioReflect(refl);

          float distToCenter = length(planePos);
          float shadow = smoothstep(0.0, 0.44, distToCenter);
          shadow = mix(0.58, 1.0, shadow);

          // Liquid base matching site palette perfectly
          vec3 liquidBase = mix(vec3(0.92, 0.94, 0.96), pageBg, smoothstep(0.0, 2.2, distToCenter));
          
          float fresnel = pow(1.0 - max(dot(-rd, normal), 0.0), 3.2);
          vec3 waterColor = mix(liquidBase, waterRefl, 0.62 + 0.38 * fresnel);
          waterColor *= shadow;

          // Sphere reflection on liquid surface
          vec2 sphereCenterProj = spherePos.xz;
          float sphereReflDist = length(planePos - sphereCenterProj);
          if (sphereReflDist < 0.36) {
            float sphereReflMask = smoothstep(0.36, 0.08, sphereReflDist) * smoothstep(0.0, 0.3, hitPos.z);
            vec3 sphereSubRefl = vec3(0.10, 0.12, 0.15) + vec3(0.85, 0.88, 0.92) * pow(1.0 - sphereReflDist / 0.36, 2.0);
            waterColor = mix(waterColor, sphereSubRefl, sphereReflMask * 0.6);
          }

          // Seamless edge & bottom blend into pageBg (#F8F9FA)
          float edgeDist = length(uv * vec2(0.9, 1.1));
          float borderFade = smoothstep(1.6, 0.65, edgeDist);
          
          // Bottom vertical gradient fade for infinite continuity into next section
          float bottomFade = smoothstep(-0.8, -0.3, uv.y);
          waterColor = mix(pageBg, waterColor, borderFade * bottomFade);

          gl_FragColor = vec4(waterColor, 1.0);
        } else {
          gl_FragColor = vec4(pageBg, 1.0);
        }
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLocation = gl.getAttribLocation(program, 'position');
    const resLocation = gl.getUniformLocation(program, 'uResolution');
    const timeLocation = gl.getUniformLocation(program, 'uTime');
    const mouseLocation = gl.getUniformLocation(program, 'uMouse');

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    resize();

    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000.0;

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.enableVertexAttribArray(posLocation);
      gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(mouseLocation, currentMouseX, currentMouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      if (program) gl.deleteProgram(program);
      if (posBuffer) gl.deleteBuffer(posBuffer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block select-none"
      />
    </div>
  );
};
