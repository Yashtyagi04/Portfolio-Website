import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Generates a soft, glowing radial gradient dot texture programmatically.
 * This ensures the particles render as glowing neon spheres rather than harsh square boxes.
 */
const createDotTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(0, 242, 254, 0.2)'); // Cyan glow outer edges
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
};

export default function InteractiveParticles() {
  const pointsRef = useRef();
  const texture = useMemo(() => createDotTexture(), []);

  // Total particle count
  const particleCount = 3000;

  // Allocate typed arrays for position, original targets, velocities, and custom colors
  const [positions, targets, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const tar = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const radius = 2.0;

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci Sphere algorithm for beautiful, uniform distribution
      const y = 1 - (i / (particleCount - 1)) * 2; // Range: 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);

      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const theta = 2 * Math.PI * i / goldenRatio;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      const actualY = y * radius;

      // Initial coordinates
      pos[i * 3] = x;
      pos[i * 3 + 1] = actualY;
      pos[i * 3 + 2] = z;

      // Target (restoration) coordinates
      tar[i * 3] = x;
      tar[i * 3 + 1] = actualY;
      tar[i * 3 + 2] = z;

      // Velocities (x, y, z) initialized to 0
      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;

      // Colors: Linear interpolation between Glowing Cyan (#00f2fe) and Purple/Pink (#9b51e0)
      // We map the normalized height (Y position) from 0 to 1
      const t = (actualY + radius) / (2 * radius);
      
      // Cyan (0, 242, 254) -> RGB [0.0, 0.95, 1.0]
      // Purple (155, 81, 224) -> RGB [0.61, 0.32, 0.88]
      const r = THREE.MathUtils.lerp(0.0, 0.61, t);
      const g = THREE.MathUtils.lerp(0.95, 0.32, t);
      const b = THREE.MathUtils.lerp(1.0, 0.88, t);

      col[i * 3] = r;
      col[i * 3 + 1] = g;
      col[i * 3 + 2] = b;
    }

    return [pos, tar, vel, col];
  }, [particleCount]);

  // Reference vectors allocated once to avoid GC churn in the high-frequency render loop
  const pPos = useMemo(() => new THREE.Vector3(), []);
  const pTar = useMemo(() => new THREE.Vector3(), []);
  const pVel = useMemo(() => new THREE.Vector3(), []);
  const mouse3D = useMemo(() => new THREE.Vector3(), []);
  const localMouse = useMemo(() => new THREE.Vector3(), []);
  const raycastPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geom = pointsRef.current?.geometry;
    if (!geom) return;

    const posAttr = geom.attributes.position;
    
    // Rotate the particle system container gently for elegant ambient animation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Get cursor intersection on the Z=0 plane in 3D world coordinates
    state.raycaster.ray.intersectPlane(raycastPlane, mouse3D);

    // Map world cursor position to local coordinate space of the rotating points object
    localMouse.copy(mouse3D);
    pointsRef.current.worldToLocal(localMouse);

    // Physics parameters
    const repulsionRadius = 1.6;
    const repulsionStrength = 0.18;
    const springStrength = 0.04; // RESTORATION FORCE
    const damping = 0.88; // FRICTION/DAMPING FOR SMOOTH FLUID MOTION

    // Simulate physics for all particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Extract current position, target, and velocity
      pPos.set(posAttr.array[i3], posAttr.array[i3 + 1], posAttr.array[i3 + 2]);
      pTar.set(targets[i3], targets[i3 + 1], targets[i3 + 2]);
      pVel.set(velocities[i3], velocities[i3 + 1], velocities[i3 + 2]);

      // Add a subtle wave/breathing motion to the targets over time
      const waveOffsetX = Math.sin(time * 0.8 + pTar.y * 2) * 0.04;
      const waveOffsetY = Math.cos(time * 0.8 + pTar.x * 2) * 0.04;
      const waveOffsetZ = Math.sin(time * 0.6 + pTar.z * 2) * 0.04;
      pTar.x += waveOffsetX;
      pTar.y += waveOffsetY;
      pTar.z += waveOffsetZ;

      // 1. Repulsion from cursor
      const distToMouse = pPos.distanceTo(localMouse);
      if (distToMouse < repulsionRadius) {
        // Organic wave falloff (exponential/quadratic push force)
        const force = Math.pow(1.0 - distToMouse / repulsionRadius, 2) * repulsionStrength;
        
        // Push vector pointing away from mouse
        const pushVec = new THREE.Vector3().subVectors(pPos, localMouse);
        
        // Handle edge-case divide by zero if mouse is exactly on the particle
        if (pushVec.lengthSq() > 0) {
          pushVec.normalize().multiplyScalar(force);
          pVel.add(pushVec);
        }
      }

      // 2. Spring force pulling back to original target
      const springVec = new THREE.Vector3().subVectors(pTar, pPos).multiplyScalar(springStrength);
      pVel.add(springVec);

      // 3. Apply damping/friction
      pVel.multiplyScalar(damping);

      // 4. Update position with new velocity
      pPos.add(pVel);

      // Save updated data back to arrays
      posAttr.array[i3] = pPos.x;
      posAttr.array[i3 + 1] = pPos.y;
      posAttr.array[i3 + 2] = pPos.z;

      velocities[i3] = pVel.x;
      velocities[i3 + 1] = pVel.y;
      velocities[i3 + 2] = pVel.z;
    }

    // Flag GPU that position attributes have changed to trigger re-rendering
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        sizeAttenuation={true}
        vertexColors={true}
        map={texture}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.85}
      />
    </points>
  );
}
