'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface ScrollTransition3DProps {
  fromColor?: string;
  toColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  variant?: 'wave' | 'vortex' | 'shatter';
}

// Simplex noise in GLSL
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
  uniform vec3 uColorFrom;
  uniform vec3 uColorTo;
  uniform int uVariant;
  varying vec2 vUv;

  ${NOISE_GLSL}

  void main() {
    float n = 0.0;
    if(uVariant == 0) { // wave
      n = snoise(vec2(vUv.x * 3.0, vUv.y * 3.0 + uTime * 0.2)) * 0.15;
    } else if(uVariant == 1) { // vortex
      n = snoise(vec2(vUv.x * 5.0 - uTime*0.1, vUv.y * 5.0 + uTime*0.1)) * 0.2;
      n += snoise(vec2(vUv.x * 10.0, vUv.y * 10.0)) * 0.05;
    } else { // shatter
      float s1 = snoise(vec2(vUv.x * 8.0 + uTime*0.05, vUv.y * 8.0)) * 0.12;
      float s2 = snoise(vec2(vUv.x * 16.0, vUv.y * 16.0 - uTime*0.08)) * 0.06;
      n = s1 + s2;
    }
    float baseMix = vUv.y;
    float finalMix = smoothstep(0.3, 0.7, baseMix + n + (uScroll - 0.5) * 0.5);
    vec3 color = mix(uColorTo, uColorFrom, finalMix);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const VARIANT_MAP: Record<string, number> = { wave: 0, vortex: 1, shatter: 2 };
const COUNT_MAP: Record<string, number> = { low: 300, medium: 600, high: 1200 };

export default function ScrollTransition3D({
  fromColor = '#050B1F',
  toColor = '#0A1628',
  intensity = 'medium',
  variant = 'wave',
}: ScrollTransition3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    bgMaterial: null as THREE.ShaderMaterial | null,
    instanced1: null as THREE.InstancedMesh | null,
    instanced2: null as THREE.InstancedMesh | null,
    particleData: [] as { x: number; y: number; z: number; rx: number; ry: number; rz: number; baseScale: number; rotX: number; rotY: number; rotZ: number }[],
    mouse: new THREE.Vector2(0, 0),
    targetMouse: new THREE.Vector2(0, 0),
    isActive: false,
    rafId: 0,
    scrollProgress: 0.5,
    particleCount: 0,
  });

  const variantInt = useMemo(() => VARIANT_MAP[variant] ?? 0, [variant]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = reducedMotion ? 50 : (COUNT_MAP[intensity] ?? 600);
    const s = stateRef.current;
    s.particleCount = count;

    // Scene
    const scene = new THREE.Scene();
    const c1 = new THREE.Color(fromColor);
    const c2 = new THREE.Color(toColor);
    scene.fog = new THREE.FogExp2(c1.clone().lerp(c2, 0.5), 0.03);
    s.scene = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, wrapper.clientWidth / (wrapper.clientHeight * 2), 0.1, 100);
    camera.position.z = 5;
    s.camera = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    s.renderer = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0x7B9BDB, 2);
    dirLight.position.set(1, 1, 2);
    scene.add(dirLight);
    const ptLight = new THREE.PointLight(0x4F6AE8, 5, 20);
    ptLight.position.set(-2, -2, 2);
    scene.add(ptLight);

    // Background plane with shader
    const bgGeo = new THREE.PlaneGeometry(30, 20);
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERTEX,
      fragmentShader: BG_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0.5 },
        uColorFrom: { value: new THREE.Color(fromColor) },
        uColorTo: { value: new THREE.Color(toColor) },
        uVariant: { value: variantInt },
      },
      depthWrite: false,
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.z = -10;
    scene.add(bgMesh);
    s.bgMaterial = bgMat;

    // Particles (instanced meshes)
    if (!reducedMotion) {
      const geo1 = new THREE.IcosahedronGeometry(0.1, 0);
      const geo2 = new THREE.OctahedronGeometry(0.08, 0);
      const mat1 = new THREE.MeshStandardMaterial({ color: 0x2E4AAD, roughness: 0.2, metalness: 0.8, wireframe: variant === 'vortex' });
      const mat2 = new THREE.MeshStandardMaterial({ color: 0x7B9BDB, roughness: 0.4, metalness: 0.4 });

      const half = Math.floor(count / 2);
      const inst1 = new THREE.InstancedMesh(geo1, mat1, half);
      const inst2 = new THREE.InstancedMesh(geo2, mat2, half);
      s.instanced1 = inst1;
      s.instanced2 = inst2;

      const dummy = new THREE.Object3D();
      const data: typeof s.particleData = [];

      for (let i = 0; i < count; i++) {
        const mesh = i < half ? inst1 : inst2;
        const idx = i % half;
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 15 - 2;
        dummy.position.set(x, y, z);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const scale = Math.random() * 0.8 + 0.2;
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);

        data.push({
          x, y, z,
          rx: Math.random() * 0.01 - 0.005,
          ry: Math.random() * 0.01 - 0.005,
          rz: Math.random() * 0.01 - 0.005,
          baseScale: scale,
          rotX: Math.random() * Math.PI,
          rotY: Math.random() * Math.PI,
          rotZ: Math.random() * Math.PI,
        });
      }
      s.particleData = data;
      scene.add(inst1);
      scene.add(inst2);
    }

    // Resize
    const resize = () => {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight * 2;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      s.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      s.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Scroll tracking via IntersectionObserver + manual scroll calc
    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: 0 when wrapper enters bottom, 1 when it exits top
      const raw = 1 - (rect.bottom / (viewH + rect.height));
      s.scrollProgress = Math.max(0, Math.min(1, raw));
      if (s.bgMaterial) {
        s.bgMaterial.uniforms.uScroll.value = s.scrollProgress;
      }
      // Camera warp
      const yWarp = (s.scrollProgress - 0.5) * 2;
      gsap.to(camera.position, { y: -yWarp * 1.5, z: 5 + Math.sin(s.scrollProgress * Math.PI) * 2, duration: 0.5, overwrite: 'auto' });
      gsap.to(scene.rotation, { x: yWarp * 0.2, duration: 0.5, overwrite: 'auto' });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // IntersectionObserver to pause/resume
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasActive = s.isActive;
          s.isActive = entry.isIntersecting;
          if (s.isActive && !wasActive) animate();
        });
      },
      { threshold: 0, rootMargin: '100px 0px' }
    );
    observer.observe(wrapper);

    // Animation loop
    const dummy = new THREE.Object3D();
    const animate = () => {
      if (!s.isActive) return;
      s.rafId = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;

      // Smooth mouse
      s.mouse.lerp(s.targetMouse, 0.05);

      // Update shader time
      if (s.bgMaterial) {
        s.bgMaterial.uniforms.uTime.value = time;
      }

      // Animate particles
      if (s.particleData.length > 0 && s.instanced1 && s.instanced2) {
        const half = Math.floor(s.particleCount / 2);
        for (let i = 0; i < s.particleCount; i++) {
          const mesh = i < half ? s.instanced1 : s.instanced2;
          const idx = i % half;
          const d = s.particleData[i];

          d.rotX += d.rx;
          d.rotY += d.ry;
          d.rotZ += d.rz;
          dummy.rotation.set(d.rotX, d.rotY, d.rotZ);

          // Mouse repulsion
          const mwx = s.mouse.x * 10;
          const mwy = s.mouse.y * 5;
          const dx = d.x - mwx;
          const dy = d.y - mwy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let pushX = 0, pushY = 0;
          if (dist < 3) {
            const force = (3 - dist) / 3;
            pushX = (dx / dist) * force * 2;
            pushY = (dy / dist) * force * 2;
          }

          const waveY = Math.sin(time + d.x) * 0.5;
          dummy.position.set(d.x + pushX, d.y + waveY + pushY, d.z);
          dummy.scale.setScalar(d.baseScale);
          dummy.updateMatrix();
          mesh.setMatrixAt(idx, dummy.matrix);
        }
        s.instanced1.instanceMatrix.needsUpdate = true;
        s.instanced2.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    // Start if visible
    onScroll();
    if (s.isActive) animate();

    return () => {
      cancelAnimationFrame(s.rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
      scene.clear();
    };
  }, [fromColor, toColor, intensity, variant, variantInt]);

  return (
    <div ref={wrapperRef} className="relative w-full h-[200px] md:h-[300px] overflow-hidden" style={{ willChange: 'transform' }}>
      <canvas
        ref={canvasRef}
        className="absolute left-0 w-full pointer-events-none"
        style={{ top: '-50%', height: '200%' }}
      />
    </div>
  );
}
