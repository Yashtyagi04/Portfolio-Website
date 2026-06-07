import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import InteractiveParticles from './InteractiveParticles.jsx';

/**
 * ParticleScene sets up the R3F Canvas and mounts the particle system.
 * It is fully responsive and overlays seamlessly on the dark background.
 */
export default function ParticleScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <InteractiveParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
