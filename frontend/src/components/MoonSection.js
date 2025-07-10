import React from 'react';

const FloatingMoon = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#f8fafc"
        roughness={0.3}
        metalness={0.1}
        emissive="#f8fafc"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const MoonSection = () => {
  return (
    <section className="section-container relative">
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.15}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          <FloatingMoon />
          <Stars radius={100} depth={50} count={2000} factor={2} saturation={0} fade />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="glass-enhanced p-12 max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-serif text-magical-moon mb-8 text-shadow-magical">
          Moonlit Sanctuary
        </h2>
        
        <div className="w-24 h-1 bg-gradient-bronze mx-auto mb-8 rounded-full"></div>
        
        <p className="text-xl text-magical-silver font-elegant leading-relaxed mb-8">
          In this celestial space, time flows differently. Here, memories dance with starlight, 
          and every moment becomes eternal. The moon above watches over our shared journey, 
          illuminating the path we've traveled together.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="glass-effect p-6 rounded-2xl">
            <h3 className="text-magical-bronze font-serif text-xl mb-3">Timeless Moments</h3>
            <p className="text-magical-silver font-elegant text-sm">
              Every second we've shared has been captured in moonbeams, 
              preserved forever in this sacred digital realm.
            </p>
          </div>
          
          <div className="glass-effect p-6 rounded-2xl">
            <h3 className="text-magical-bronze font-serif text-xl mb-3">Eternal Bond</h3>
            <p className="text-magical-silver font-elegant text-sm">
              Like the moon that returns each night, our connection remains 
              constant, beautiful, and unwavering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoonSection;