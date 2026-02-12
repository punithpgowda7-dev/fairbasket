'use client';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';
import { Suspense, useState } from 'react';

// Safe Model Component
function Model({ url, onError }: { url: string, onError: () => void }) {
  try {
    const { scene } = useGLTF(url, true);
    return <primitive object={scene} />;
  } catch (error) {
    onError();
    return null;
  }
}

export default function ProductViewer3D({ modelUrl, imageUrl }: any) {
  const [isError, setIsError] = useState(false);

  // If broken link or error, show IMAGE
  if (!modelUrl || isError) {
    return (
      <div className="h-96 w-full bg-gray-900 rounded-xl overflow-hidden relative border border-white/10 group">
        <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-1 rounded text-xs text-white">
          High-Res Preview
        </div>
        <img 
          src={imageUrl} 
          alt="Product" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
             // Fallback for broken images
             (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png?text=No+Image';
          }}
        />
      </div>
    );
  }

  // Try showing 3D
  return (
    <div className="h-96 w-full bg-gray-800/30 rounded-xl relative overflow-hidden border border-white/10">
      <div className="absolute top-2 left-2 z-10 bg-blue-600 px-2 py-1 rounded text-xs text-white font-bold shadow-lg">
        3D Interactive View
      </div>
      
      {/* Error Boundary stops the Red Screen of Death */}
      <ErrorBoundary fallback={() => setIsError(true)}>
        <Canvas dpr={[1, 2]} camera={{ fov: 50 }} shadows>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Model url={modelUrl} onError={() => setIsError(true)} />
            </Stage>
            <OrbitControls autoRotate autoRotateSpeed={1.5} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

// Helper for Error Boundary
import React from 'react';
class ErrorBoundary extends React.Component<{ fallback: () => void, children: React.ReactNode }> {
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() { this.props.fallback(); }
  render() {
    // @ts-ignore
    if (this.state?.hasError) return null;
    return this.props.children;
  }
}