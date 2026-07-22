"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Cinematic hero bottle, real-time glass flacon with amber liquid, gold cap,
 * orbiting studio lights (moving reflections), slow float, mouse parallax.
 */
export default function BottleScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0.4, 7.5);

    const group = new THREE.Group();
    scene.add(group);

    // --- Bottle silhouette (lathe) ---
    const profile: THREE.Vector2[] = [];
    const pts: [number, number][] = [
      [0.0, 0.0], [0.72, 0.0], [0.86, 0.06], [0.94, 0.22], [0.97, 0.7],
      [0.97, 1.5], [0.94, 1.98], [0.82, 2.22], [0.5, 2.38], [0.3, 2.44],
      [0.28, 2.62], [0.28, 2.8],
    ];
    pts.forEach(([x, y]) => profile.push(new THREE.Vector2(x, y)));

    const glassGeo = new THREE.LatheGeometry(profile, 96);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d0d10,
      metalness: 0,
      roughness: 0.06,
      transmission: 0.92,
      thickness: 1.4,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.6,
      side: THREE.DoubleSide,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    group.add(glass);

    // --- Amber liquid ---
    const liquidProfile = profile.slice(0, 8).map((p) => new THREE.Vector2(p.x * 0.86, p.y * 0.92 + 0.05));
    const liquidGeo = new THREE.LatheGeometry(liquidProfile, 64);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xc98b3a,
      metalness: 0,
      roughness: 0.25,
      transmission: 0.6,
      thickness: 2,
      ior: 1.35,
      envMapIntensity: 0.8,
      emissive: 0x3a2408,
      emissiveIntensity: 0.55,
    });
    group.add(new THREE.Mesh(liquidGeo, liquidMat));

    // --- Gold cap ---
    const capGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.62, 64, 1);
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a86a,
      metalness: 1,
      roughness: 0.22,
      envMapIntensity: 1.8,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 3.05;
    group.add(cap);

    const capRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.335, 0.02, 24, 64),
      new THREE.MeshPhysicalMaterial({ color: 0xe8d5a4, metalness: 1, roughness: 0.12, envMapIntensity: 2 })
    );
    capRing.rotation.x = Math.PI / 2;
    capRing.position.y = 2.78;
    group.add(capRing);

    // --- Gold plaque with engraved label ---
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 640;
    labelCanvas.height = 300;
    const lc = labelCanvas.getContext("2d")!;
    const lg = lc.createLinearGradient(0, 0, 640, 300);
    lg.addColorStop(0, "#a8854e");
    lg.addColorStop(0.4, "#d9c08c");
    lg.addColorStop(0.6, "#c2a068");
    lg.addColorStop(1, "#93743f");
    lc.fillStyle = lg;
    lc.fillRect(0, 0, 640, 300);
    lc.strokeStyle = "rgba(40,28,10,0.55)";
    lc.lineWidth = 4;
    lc.strokeRect(18, 18, 604, 264);
    lc.fillStyle = "#241a08";
    lc.textAlign = "center";
    lc.letterSpacing = "16px";
    lc.font = "300 72px Georgia, serif";
    lc.fillText("VELOURE", 336, 152);
    lc.letterSpacing = "6px";
    lc.font = "300 30px Georgia, serif";
    lc.fillText("NOIR OUD", 323, 216);
    lc.font = "24px Georgia, serif";
    lc.fillText("PARFUMS D’AUTOMOBILE", 323, 72);
    const labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.colorSpace = THREE.SRGBColorSpace;
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 0.42),
      new THREE.MeshPhysicalMaterial({ map: labelTex, metalness: 0.85, roughness: 0.38, envMapIntensity: 1.2 })
    );
    plaque.position.set(0, 1.25, 0.975);
    group.add(plaque);

    group.position.y = -1.35;

    // --- Studio lights (orbiting => moving reflections) ---
    const key = new THREE.SpotLight(0xfff2dc, 60, 30, 0.5, 0.6);
    key.position.set(4, 5, 5);
    scene.add(key);
    const rim = new THREE.SpotLight(0xc9a86a, 45, 30, 0.6, 0.7);
    rim.position.set(-5, 3, -3);
    scene.add(rim);
    const fill = new THREE.PointLight(0x8899bb, 6, 20);
    fill.position.set(-3, -1, 4);
    scene.add(fill);

    // --- Mouse parallax ---
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onMouse = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(mount);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const t = clock.getElapsedTime();

      if (!reduced) {
        group.position.y = -1.35 + Math.sin(t * 0.6) * 0.09;
        group.rotation.y = Math.sin(t * 0.22) * 0.28 + mx * 0.35;
        group.rotation.x = my * 0.08;
        key.position.x = Math.sin(t * 0.3) * 5;
        key.position.z = Math.cos(t * 0.3) * 5;
        rim.position.x = Math.sin(t * 0.24 + Math.PI) * 5.5;
        rim.position.z = Math.cos(t * 0.24 + Math.PI) * 4;
        mx += (tmx - mx) * 0.04;
        my += (tmy - my) * 0.04;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      ro.disconnect();
      io.disconnect();
      pmrem.dispose();
      renderer.dispose();
      glassGeo.dispose();
      liquidGeo.dispose();
      capGeo.dispose();
      scene.clear();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={`h-full w-full ${className}`} aria-hidden />;
}
