import React, { useEffect, useRef } from 'react';

interface MosaicHeroCanvasProps {
  onPreloadComplete?: () => void;
  className?: string;
  anchorRef: React.RefObject<HTMLImageElement | HTMLDivElement | null>;
  play?: boolean;
}

const VERTEX_SHADER = `#version 300 es
precision highp float;

in vec2 aHome;   // 0..1 inside the anchor rect
in vec3 aAir;    // x,y 0..1 over the canvas, z = depth (0 near, 1 far)
in vec4 aInfo;   // delay, duration, phase, isDust
in vec4 aColor;  // exact RGBA sampled from Deepak's photo

uniform vec2 uRes;       // canvas, CSS px
uniform vec4 uRect;      // anchor x, y, w, h in canvas CSS px
uniform float uCell;     // tile pitch, CSS px
uniform float uDpr;
uniform float uTime;     // seconds, always running
uniform float uReveal;   // seconds since play
uniform float uScatter;  // 0 = face, 1 = blown back into the air
uniform vec2 uMouse;     // CSS px, far away when absent

out vec2 vHomeUv;
out vec4 vColor;
out float vLand;
out float vAlpha;
out float vPhase;
out float vIsDust;

float easeInOutCubic(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
  float delay  = aInfo.x;
  float dur    = aInfo.y;
  float phase  = aInfo.z;
  bool isDust  = aInfo.w > 0.5;
  float depth  = aAir.z;

  // Gentle cosmic drift when in the air
  vec2 drift = vec2(
    sin(uTime * 0.35 + phase * 6.283),
    cos(uTime * 0.28 + phase * 9.141)
  ) * (8.0 + 24.0 * (1.0 - depth));

  vec2 air  = aAir.xy * uRes + drift;
  vec2 home = uRect.xy + aHome * uRect.zw;

  // Staggered reveal: appear as floating speck, fly home to form Deepak
  float appear = smoothstep(0.0, 0.7, uReveal - delay * 0.32);
  float fly    = isDust ? 0.0 : clamp((uReveal - delay) / dur, 0.0, 1.0);
  float e      = easeInOutCubic(fly);

  // Scroll scatter
  float q = clamp(uScatter * 1.6 - phase * 0.6, 0.0, 1.0);
  q = q * q;
  float k = e * (1.0 - q); // 1 = sitting in the face

  vec2 pos = mix(air, home, k);

  // Elegant curved arc path while flying home
  vec2 d = home - air;
  pos += vec2(-d.y, d.x) * 0.16 * sin(3.14159 * k) * (phase - 0.5);

  // Dynamic interactive pointer repulsion
  vec2 m = pos - uMouse;
  float ml = length(m);
  float repelRadius = 100.0;
  if (ml < repelRadius && ml > 0.001) {
    float repelStrength = smoothstep(repelRadius, 0.0, ml);
    pos += (m / ml) * repelStrength * 18.0 * k;
  }

  float land = smoothstep(0.65, 1.0, k);
  float speckSize = mix(2.6, 1.2, depth);
  // Seamless mosaic particle size: slightly overlaps adjacent cells when settled to eliminate harsh dark screen-door lines
  float tileSize = uCell * 1.18;
  float size = mix(speckSize, tileSize, land);

  float dustAlpha = isDust ? mix(0.5, 0.15, smoothstep(1.5, 3.5, uReveal)) : 1.0;

  vHomeUv = aHome;
  vColor  = aColor;
  vLand   = land;
  vAlpha  = appear * mix(0.4 + 0.6 * (1.0 - depth), 1.0, land) * dustAlpha;
  vPhase  = phase;
  vIsDust = isDust ? 1.0 : 0.0;

  vec2 clip = (pos / uRes) * 2.0 - 1.0;
  gl_Position  = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = max(size * uDpr, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uFace;
uniform vec2 uCellUv;
uniform float uTime;

in vec2 vHomeUv;
in vec4 vColor;
in float vLand;
in float vAlpha;
in float vPhase;
in float vIsDust;

out vec4 outColor;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);

  // Soft rounded particle footprint that seamlessly tiles into photo surface
  // While airborne (vLand ~ 0) it is a crisp starry circular speck
  // When settled (vLand ~ 1), it softly fills the cell footprint without harsh black grid cuts
  float edgeCut = mix(0.50, 0.68, vLand);
  if (dist > edgeCut) {
    discard;
  }
  float circleAlpha = smoothstep(edgeCut, edgeCut - mix(0.18, 0.10, vLand), dist);
  float shape = circleAlpha;

  // Exact continuous photo texture of Deepak
  vec2 localUv = coord * uCellUv * 0.95;
  vec4 faceTex = texture(uFace, vHomeUv + localUv);

  // Floating stardust color in the atmosphere
  vec3 speckCol = mix(vec3(0.9, 0.95, 1.0), vec3(1.0, 0.88, 0.72), vPhase);
  float twinkle = 0.9 + 0.1 * sin(uTime * 2.0 + vPhase * 43.0);
  speckCol *= twinkle;

  // True photo color of Deepak: sample pure high-res faceTex for maximum clarity and detail
  vec3 photoColor = mix(vColor.rgb, faceTex.rgb, 0.85);

  // Subtle vibrance and contrast curve to keep Deepak's skin tone warm, clear, and lifelike
  photoColor = pow(photoColor, vec3(0.94)) * 1.05;

  // Transition from cosmic speck to exact photorealistic Deepak
  vec3 finalRgb = mix(speckCol, photoColor, vLand);

  // Subtle living shimmer on portrait highlights to preserve particle vibrancy
  if (vLand > 0.85) {
    float shimmer = 1.0 + 0.015 * sin(uTime * 1.2 + (vHomeUv.x + vHomeUv.y) * 20.0);
    finalRgb *= shimmer;
  }

  // Ensure solid opaque coverage for Deepak's portrait pixels when settled
  float effectiveAlpha = mix(0.75, max(faceTex.a, vColor.a), vLand);
  float finalAlpha = vAlpha * shape * effectiveAlpha;

  if (finalAlpha < 0.01) discard;

  outColor = vec4(finalRgb * finalAlpha, finalAlpha);
}
`;

const DUST_RATIO = 0.06;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Shader creation failed');
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || 'Shader compilation error');
  }
  return shader;
}

function getCellPitch(anchorWidth: number): number {
  // Ultra-fine particle grid: ~1.4px to 1.85px pitch for razor-sharp facial details & glasses definition
  return Math.min(2.0, Math.max(1.35, anchorWidth / 420));
}

interface ParticleGridResult {
  settle: number;
  cell: number;
  cols: number;
  rows: number;
  count: number;
  home: Float32Array;
  air: Float32Array;
  info: Float32Array;
  color: Float32Array;
}

function generateParticlesFromImage(
  img: HTMLImageElement,
  anchorWidth: number,
  revealRatio: number
): ParticleGridResult {
  const cellPitch = getCellPitch(anchorWidth);
  const cols = Math.max(30, Math.round(anchorWidth / cellPitch));
  const natW = img.naturalWidth || img.width || 1122;
  const natH = img.naturalHeight || img.height || 1402;
  const rows = Math.round((cols * natH) / natW);

  const canvas = document.createElement('canvas');
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    return {
      settle: 1.5,
      cell: cellPitch,
      cols,
      rows,
      count: 0,
      home: new Float32Array(0),
      air: new Float32Array(0),
      info: new Float32Array(0),
      color: new Float32Array(0),
    };
  }

  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, cols, rows);
  const imgData = ctx.getImageData(0, 0, cols, rows).data;

  const homeArr: number[] = [];
  const airArr: number[] = [];
  const infoArr: number[] = [];
  const colorArr: number[] = [];

  let maxSettleTime = 0;

  const addParticle = (
    u: number,
    v: number,
    r: number,
    g: number,
    b: number,
    a: number,
    isDust: boolean
  ) => {
    homeArr.push(u, v);
    airArr.push(
      Math.random() * 1.2 - 0.1,
      Math.random() * 1.2 - 0.1,
      Math.random() // depth
    );

    const delay = 0.25 + Math.random() * 0.95 + v * 0.40;
    const dur = 1.25 + Math.random() * 0.55;
    if (!isDust) {
      maxSettleTime = Math.max(maxSettleTime, delay + dur);
    }

    infoArr.push(delay, dur, Math.random(), isDust ? 1 : 0);
    colorArr.push(r, g, b, a);
  };

  // Check if image corners are dark/black background (e.g. studio portrait or JPEG)
  const getLum = (c: number, r: number) => {
    const i = (r * cols + c) * 4;
    return (imgData[i] * 0.299 + imgData[i + 1] * 0.587 + imgData[i + 2] * 0.114) / 255;
  };
  const cornerLums = [
    getLum(0, 0),
    getLum(cols - 1, 0),
    getLum(0, Math.min(rows - 1, 4)),
    getLum(cols - 1, Math.min(rows - 1, 4)),
  ];
  const hasDarkStudioBg = cornerLums.every((l) => l < 0.08);

  const limitRow = Math.min(rows, Math.ceil(rows * revealRatio));

  for (let row = 0; row < limitRow; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = (row * cols + col) * 4;
      const alpha = imgData[idx + 3];

      // Keep all non-transparent pixels that form Deepak's portrait
      if (alpha < 25) continue;

      const r = imgData[idx] / 255;
      const g = imgData[idx + 1] / 255;
      const b = imgData[idx + 2] / 255;
      const lum = r * 0.299 + g * 0.587 + b * 0.114;

      // In dark studio backgrounds, filter out pure void background so Deepak's features float cleanly
      if (hasDarkStudioBg && lum < 0.038) continue;

      const a = alpha / 255;
      const u = (col + 0.5) / cols;
      const v = (row + 0.5) / rows;

      addParticle(u, v, r, g, b, a, false);
    }
  }

  // Atmospheric stardust particles that linger around the hero space
  const particleCount = homeArr.length / 2;
  const dustCount = Math.round(particleCount * DUST_RATIO);
  for (let d = 0; d < dustCount; d++) {
    addParticle(
      Math.random(),
      Math.random(),
      0.9,
      0.92,
      1.0,
      0.35,
      true
    );
  }

  return {
    settle: maxSettleTime,
    cell: cellPitch,
    cols,
    rows,
    count: homeArr.length / 2,
    home: new Float32Array(homeArr),
    air: new Float32Array(airArr),
    info: new Float32Array(infoArr),
    color: new Float32Array(colorArr),
  };
}

export const MosaicHeroCanvas: React.FC<MosaicHeroCanvasProps> = ({
  onPreloadComplete,
  className = '',
  anchorRef,
  play = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const playStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (play && playStartTimeRef.current === null) {
      playStartTimeRef.current = performance.now() / 1000;
    }
  }, [play]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const anchor = anchorRef.current;
    if (!canvas || !anchor) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });

    if (!gl) {
      console.warn('WebGL2 not supported, skipping mosaic canvas.');
      onPreloadComplete?.();
      return;
    }

    let isDisposed = false;
    let animId: number;

    const mousePos = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const globalStartTime = performance.now() / 1000;

    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    const buffers: WebGLBuffer[] = [];

    let portraitImage: HTMLImageElement | null = null;
    let cachedAnchorWidth = -1;
    let currentParticleCount = 0;
    let currentCellPitch = 3;
    let currentCols = 100;
    let currentRows = 125;

    try {
      const vert = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

      program = gl.createProgram()!;
      gl.attachShader(program, vert);
      gl.attachShader(program, frag);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Program link failed');
      }
    } catch (err) {
      console.error('WebGL setup error:', err);
      onPreloadComplete?.();
      return;
    }

    gl.useProgram(program);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uRect = gl.getUniformLocation(program, 'uRect');
    const uCell = gl.getUniformLocation(program, 'uCell');
    const uCellUv = gl.getUniformLocation(program, 'uCellUv');
    const uDpr = gl.getUniformLocation(program, 'uDpr');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uReveal = gl.getUniformLocation(program, 'uReveal');
    const uScatter = gl.getUniformLocation(program, 'uScatter');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uFace = gl.getUniformLocation(program, 'uFace');

    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const attrNames = ['aHome', 'aAir', 'aInfo', 'aColor'];
    const attrSizes = [2, 3, 4, 4];

    attrNames.forEach((name, i) => {
      const buf = gl.createBuffer()!;
      buffers.push(buf);
      const loc = gl.getAttribLocation(program!, name);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, attrSizes[i], gl.FLOAT, false, 0, 0);
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const rebuildParticles = () => {
      if (!portraitImage || isDisposed) return;
      const anchorRect = anchor.getBoundingClientRect();
      const aWidth = anchorRect.width;
      if (aWidth < 10 || Math.abs(aWidth - cachedAnchorWidth) < 1) return;
      cachedAnchorWidth = aWidth;

      const canvasRect = canvas.getBoundingClientRect();
      const revealRatio = Math.max(0, Math.min(1, (canvasRect.bottom - anchorRect.top) / anchorRect.height));

      const grid = generateParticlesFromImage(portraitImage, aWidth, revealRatio);
      currentParticleCount = grid.count;
      currentCellPitch = grid.cell;
      currentCols = grid.cols;
      currentRows = grid.rows;

      const arrays = [grid.home, grid.air, grid.info, grid.color];
      arrays.forEach((arr, idx) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[idx]);
        gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.tx = e.clientX - rect.left;
      mousePos.ty = e.clientY - rect.top;
      if (mousePos.x < -999) {
        mousePos.x = mousePos.tx;
        mousePos.y = mousePos.ty;
      }
    };

    const handlePointerLeave = () => {
      mousePos.tx = -9999;
      mousePos.ty = -9999;
      mousePos.x = -9999;
      mousePos.y = -9999;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    let activeTexture = gl.createTexture();

    const applyPortrait = (portrait: HTMLImageElement) => {
      if (isDisposed) return;
      portraitImage = portrait;

      if (!activeTexture) {
        activeTexture = gl.createTexture();
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, activeTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, portrait);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.uniform1i(uFace, 0);

      cachedAnchorWidth = -1; // force recompute grid
      rebuildParticles();
      onPreloadComplete?.();
    };

    const loadPortrait = (src: string) => {
      loadImage(src)
        .then(applyPortrait)
        .catch((err) => {
          console.error('Failed to load portrait texture:', err);
          onPreloadComplete?.();
        });
    };

    // Always use the latest updated /assets/hero_center.png
    const initialSrc = `/assets/hero_center.png?v=${Date.now()}`;
    loadPortrait(initialSrc);

    const handlePortraitUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ dataUrl: string }>;
      if (customEvent.detail?.dataUrl) {
        loadPortrait(customEvent.detail.dataUrl);
      }
    };
    window.addEventListener('update-deepak-portrait', handlePortraitUpdate);

    const render = () => {
      if (isDisposed) return;

      if (!currentParticleCount) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        animId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvasRect = canvas.getBoundingClientRect();
      const width = Math.round(canvasRect.width * dpr);
      const height = Math.round(canvasRect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        rebuildParticles();
      }

      const anchorRect = anchor.getBoundingClientRect();
      const now = performance.now() / 1000;
      const revealTime = playStartTimeRef.current !== null ? now - playStartTimeRef.current : 0;
      const scatterRatio = Math.min(1, Math.max(0, -canvasRect.top / (canvasRect.height * 0.7)));

      mousePos.x += (mousePos.tx - mousePos.x) * 0.18;
      mousePos.y += (mousePos.ty - mousePos.y) * 0.18;

      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uRes, canvasRect.width, canvasRect.height);
      gl.uniform4f(
        uRect,
        anchorRect.left - canvasRect.left,
        anchorRect.top - canvasRect.top,
        anchorRect.width,
        anchorRect.height
      );
      gl.uniform1f(uCell, currentCellPitch);
      gl.uniform2f(uCellUv, 1.0 / currentCols, 1.0 / currentRows);
      gl.uniform1f(uDpr, dpr);
      gl.uniform1f(uTime, now - globalStartTime);
      gl.uniform1f(uReveal, revealTime);
      gl.uniform1f(uScatter, scatterRatio);
      gl.uniform2f(uMouse, mousePos.x, mousePos.y);

      gl.drawArrays(gl.POINTS, 0, currentParticleCount);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      rebuildParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('update-deepak-portrait', handlePortraitUpdate);
      buffers.forEach((b) => gl.deleteBuffer(b));
      if (activeTexture) gl.deleteTexture(activeTexture);
      if (vao) gl.deleteVertexArray(vao);
      if (program) gl.deleteProgram(program);
    };
  }, [anchorRef]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Portrait of Deepak Konijeti formed of interactive particles from his picture"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
