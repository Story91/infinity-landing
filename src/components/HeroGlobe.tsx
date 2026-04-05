'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Generate points on a sphere using fibonacci distribution
function fibonacciSphere(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    points.push(new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi)
    ));
  }
  return points;
}

export default function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 3.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);

    // Globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // ---- Wireframe sphere ----
    const sphereGeo = new THREE.SphereGeometry(1, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x2E4AAD,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    globeGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

    // ---- Latitude/longitude grid lines ----
    const gridMat = new THREE.LineBasicMaterial({ color: 0x7B9BDB, transparent: true, opacity: 0.08 });
    // Latitudes
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = (90 - lat) * (Math.PI / 180);
      const r = Math.sin(phi);
      const y = Math.cos(phi);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }
    // Longitudes
    for (let lon = 0; lon < 360; lon += 30) {
      const theta = lon * (Math.PI / 180);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const phi = (i / 64) * Math.PI;
        pts.push(new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta)
        ));
      }
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    // ---- Glowing dots on surface ----
    const dotCount = 200;
    const dotPositions = fibonacciSphere(dotCount);
    const dotGeo = new THREE.BufferGeometry();
    const dotPosArr = new Float32Array(dotCount * 3);
    const dotSizes = new Float32Array(dotCount);
    for (let i = 0; i < dotCount; i++) {
      const p = dotPositions[i].multiplyScalar(1.005);
      dotPosArr[i * 3] = p.x;
      dotPosArr[i * 3 + 1] = p.y;
      dotPosArr[i * 3 + 2] = p.z;
      dotSizes[i] = Math.random() * 3 + 1.5;
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPosArr, 3));
    dotGeo.setAttribute('aSize', new THREE.BufferAttribute(dotSizes, 1));

    const dotMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aSize;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
          // Fade dots on back side
          vec3 norm = normalize(normalMatrix * normalize(position));
          vAlpha = smoothstep(-0.2, 0.3, norm.z) * 0.9;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(0.482, 0.608, 0.859, glow * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    globeGroup.add(new THREE.Points(dotGeo, dotMat));

    // ---- Arcs connecting random dot pairs ----
    const arcMat = new THREE.LineBasicMaterial({ color: 0x4F6AE8, transparent: true, opacity: 0.3 });
    const arcCount = 12;
    for (let i = 0; i < arcCount; i++) {
      const a = dotPositions[Math.floor(Math.random() * dotCount)].clone().normalize();
      const b = dotPositions[Math.floor(Math.random() * dotCount)].clone().normalize();
      const mid = a.clone().add(b).normalize().multiplyScalar(1.2 + Math.random() * 0.3);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const arcPts = curve.getPoints(32);
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), arcMat));
    }

    // ---- Outer glow ring ----
    const ringGeo = new THREE.RingGeometry(1.15, 1.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2E4AAD,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    globeGroup.add(ring);

    // ---- Atmosphere glow (sprite) ----
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 256;
    glowCanvas.height = 256;
    const ctx = glowCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(128, 128, 40, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(79, 106, 232, 0.15)');
    gradient.addColorStop(0.5, 'rgba(46, 74, 173, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const glowTex = new THREE.CanvasTexture(glowCanvas);
    const glowSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTex, transparent: true, blending: THREE.AdditiveBlending })
    );
    glowSprite.scale.set(4, 4, 1);
    globeGroup.add(glowSprite);

    // Initial tilt
    globeGroup.rotation.x = 0.3;
    globeGroup.rotation.z = -0.1;

    // ---- Mouse interaction ----
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0.3;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = mouseX * 0.5;
      targetRotX = 0.3 + mouseY * 0.3;
    };
    container.addEventListener('mousemove', onMouseMove);

    // ---- Resize ----
    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // ---- Animate ----
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Auto-rotate + mouse influence
      globeGroup.rotation.y += 0.002;
      globeGroup.rotation.y += (targetRotY - (globeGroup.rotation.y % (Math.PI * 2))) * 0.01;
      globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.02;

      // Pulse ring
      ring.material.opacity = 0.04 + Math.sin(time * 2) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[2] pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
