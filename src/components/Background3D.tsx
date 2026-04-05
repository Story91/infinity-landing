'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const NOISE_GLSL = `
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x * x0.x  + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

const BG_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BG_FRAGMENT = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  varying vec2 vUv;

  ${NOISE_GLSL}

  void main() {
    vec3 colDeep    = vec3(0.02, 0.043, 0.122);   // #050B1F
    vec3 colMid     = vec3(0.039, 0.086, 0.157);   // #0A1628
    vec3 colStellar = vec3(0.043, 0.059, 0.18);    // #0B0F2E
    vec3 colAccent  = vec3(0.18, 0.29, 0.68);      // #2E4AAD
    vec3 colGlow    = vec3(0.482, 0.608, 0.859);   // #7B9BDB

    // Multi-layer noise — wave + vortex + shatter combined
    float n1 = snoise(vec2(vUv.x * 3.0, vUv.y * 3.0 + uTime * 0.15)) * 0.15;
    float n2 = snoise(vec2(vUv.x * 5.0 - uTime * 0.08, vUv.y * 5.0 + uTime * 0.06)) * 0.12;
    float n3 = snoise(vec2(vUv.x * 8.0 + uTime * 0.04, vUv.y * 8.0 - uTime * 0.05)) * 0.08;

    // Scroll-driven color phase
    float scrollPhase = uScroll * 6.28318;
    float blend1 = smoothstep(0.3, 0.7, vUv.y + n1 + sin(scrollPhase) * 0.15);
    float blend2 = smoothstep(0.2, 0.8, vUv.y + n2 + cos(scrollPhase * 0.7) * 0.1);

    vec3 color = mix(colDeep, colMid, blend1);
    color = mix(color, colStellar, blend2 * 0.6);

    // Nebula glow patches
    float glow1 = smoothstep(0.55, 0.9, snoise(vec2(vUv.x * 2.0 + uTime * 0.03, vUv.y * 2.0)) * 0.5 + 0.5) * 0.15;
    float glow2 = smoothstep(0.6, 0.95, snoise(vec2(vUv.x * 4.0 - uTime * 0.05, vUv.y * 3.0)) * 0.5 + 0.5) * 0.1;
    color += colAccent * glow1;
    color += colGlow * glow2;

    // Mouse glow
    float mouseDist = distance(vUv, uMouse);
    color += colGlow * smoothstep(0.4, 0.0, mouseDist) * 0.08;

    // Fine detail noise
    color += n3 * 0.3;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = reducedMotion ? 100 : 1200;

    // Scene
    const scene = new THREE.Scene();
    const fogColor = new THREE.Color('#050B1F').lerp(new THREE.Color('#0A1628'), 0.5);
    scene.fog = new THREE.FogExp2(fogColor, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

    // ---- BACKGROUND SHADER PLANE (ortho) ----
    const orthoScene = new THREE.Scene();
    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERTEX,
      fragmentShader: BG_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      depthWrite: false,
    });
    orthoScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat));

    // ---- LIGHTS ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0x7B9BDB, 2);
    dirLight.position.set(1, 1, 2);
    scene.add(dirLight);
    const ptLight = new THREE.PointLight(0x4F6AE8, 5, 30);
    ptLight.position.set(-3, -3, 3);
    scene.add(ptLight);

    // ---- INSTANCED MESHES (same as ScrollTransition3D) ----
    const geo1 = new THREE.IcosahedronGeometry(0.1, 0);
    const geo2 = new THREE.OctahedronGeometry(0.08, 0);
    const mat1 = new THREE.MeshStandardMaterial({ color: 0x2E4AAD, roughness: 0.2, metalness: 0.8 });
    const mat2 = new THREE.MeshStandardMaterial({ color: 0x7B9BDB, roughness: 0.4, metalness: 0.4 });
    // Extra wireframe variant
    const geo3 = new THREE.IcosahedronGeometry(0.12, 0);
    const mat3 = new THREE.MeshStandardMaterial({ color: 0x4F6AE8, roughness: 0.3, metalness: 0.6, wireframe: true });

    const third = Math.floor(particleCount / 3);
    const inst1 = new THREE.InstancedMesh(geo1, mat1, third);
    const inst2 = new THREE.InstancedMesh(geo2, mat2, third);
    const inst3 = new THREE.InstancedMesh(geo3, mat3, third);

    const dummy = new THREE.Object3D();
    type PData = { x: number; y: number; z: number; rx: number; ry: number; rz: number; baseScale: number; rotX: number; rotY: number; rotZ: number };
    const particleData: PData[] = [];

    const spreadX = 25;
    const spreadY = 25;
    const spreadZ = 20;

    for (let i = 0; i < particleCount; i++) {
      const meshGroup = i < third ? 0 : i < third * 2 ? 1 : 2;
      const mesh = [inst1, inst2, inst3][meshGroup];
      const idx = i % third;

      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ - 3;
      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = Math.random() * 0.8 + 0.2;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(idx, dummy.matrix);

      particleData.push({
        x, y, z,
        rx: Math.random() * 0.008 - 0.004,
        ry: Math.random() * 0.008 - 0.004,
        rz: Math.random() * 0.005 - 0.0025,
        baseScale: scale,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
      });
    }

    scene.add(inst1);
    scene.add(inst2);
    scene.add(inst3);

    // ---- STATE ----
    let scrollProgress = 0;
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    let rafId = 0;

    // ---- EVENTS ----
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      bgMat.uniforms.uScroll.value = scrollProgress;

      // Camera warp from scroll
      const yWarp = (scrollProgress - 0.5) * 2;
      gsap.to(camera.position, { y: -yWarp * 2, z: 8 + Math.sin(scrollProgress * Math.PI) * 3, duration: 0.8, overwrite: 'auto' });
      gsap.to(scene.rotation, { x: yWarp * 0.15, duration: 0.8, overwrite: 'auto' });
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    // ---- ANIMATION LOOP ----
    const animDummy = new THREE.Object3D();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Smooth mouse
      mouse.lerp(targetMouse, 0.05);

      // Shader uniforms
      bgMat.uniforms.uTime.value = reducedMotion ? time * 0.3 : time;
      bgMat.uniforms.uMouse.value.set(
        mouse.x * 0.5 + 0.5,
        mouse.y * 0.5 + 0.5
      );

      // Render background first (clear + ortho)
      renderer.clear();
      renderer.render(orthoScene, orthoCamera);

      // Animate instanced particles
      if (!reducedMotion) {
        for (let i = 0; i < particleCount; i++) {
          const meshGroup = i < third ? 0 : i < third * 2 ? 1 : 2;
          const mesh = [inst1, inst2, inst3][meshGroup];
          const idx = i % third;
          const d = particleData[i];

          d.rotX += d.rx;
          d.rotY += d.ry;
          d.rotZ += d.rz;
          animDummy.rotation.set(d.rotX, d.rotY, d.rotZ);

          // Mouse repulsion
          const mwx = mouse.x * 12;
          const mwy = mouse.y * 8;
          const dx = d.x - mwx;
          const dy = d.y - mwy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let pushX = 0, pushY = 0;
          if (dist < 4) {
            const force = (4 - dist) / 4;
            pushX = (dx / dist) * force * 2.5;
            pushY = (dy / dist) * force * 2.5;
          }

          const waveY = Math.sin(time * 0.5 + d.x * 0.5) * 0.6;
          const waveX = Math.cos(time * 0.3 + d.y * 0.3) * 0.3;
          animDummy.position.set(d.x + pushX + waveX, d.y + waveY + pushY, d.z);
          animDummy.scale.setScalar(d.baseScale);
          animDummy.updateMatrix();
          mesh.setMatrixAt(idx, animDummy.matrix);
        }
        inst1.instanceMatrix.needsUpdate = true;
        inst2.instanceMatrix.needsUpdate = true;
        inst3.instanceMatrix.needsUpdate = true;
      }

      // Render 3D scene on top of background
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      scene.clear();
      orthoScene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
