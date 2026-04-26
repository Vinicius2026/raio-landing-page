'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Constantes
const PARTICLE_COUNT = 3600; // 60x60 para evitar Float32Array OutOfBounds crash
const DAMPING = 0.05;

// Componente Core da Malha Instanciada (As partículas em si)
function ParticleWave() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { pointer, viewport } = useThree();

    // Cache matemático das posições originais usando useMemo
    const { positions, dummy } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const dummy = new THREE.Object3D();
        let i = 0;
        const range = 40;
        const sideElements = Math.sqrt(PARTICLE_COUNT);

        for (let ix = 0; ix < sideElements; ix++) {
            for (let iz = 0; iz < sideElements; iz++) {
                const x = (ix / sideElements - 0.5) * range;
                const z = (iz / sideElements - 0.5) * range;
                // Deixamos o Y como 0 inicial, o useFrame cuida da onda.
                positions[i * 3] = x;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = z;
                i++;
            }
        }
        return { positions, dummy };
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime() * 0.5;

        // O mouse interage suavemente
        const targetX = pointer.x * (viewport.width / 4);
        const targetY = pointer.y * (viewport.height / 4);

        let i = 0;
        const sideElements = Math.sqrt(PARTICLE_COUNT);
        for (let ix = 0; ix < sideElements; ix++) {
            for (let iz = 0; iz < sideElements; iz++) {
                // Prevenção de segurança de limite
                if (i >= PARTICLE_COUNT) break;

                const px = positions[i * 3];
                const pz = positions[i * 3 + 2];

                // Fórmulas matemáticas para onda
                const dx = px + time;
                const dz = pz + time;

                // Cria uma oscilação tipo relevo topográfico
                let py = Math.sin(dx * 0.3) * 1.5 + Math.cos(dz * 0.4) * 1.5;

                // Calcula a influência magnética do mouse
                const distToMouse = Math.sqrt(Math.pow(px - targetX, 2) + Math.pow(pz - targetY, 2));
                if (distToMouse < 8) {
                    const influence = (8 - distToMouse) * 0.3; // Eleva a partícula baseada na proximidade
                    py += influence;
                }

                dummy.position.set(px, py, pz);
                dummy.rotation.x = time * 0.2;
                dummy.rotation.y = time * 0.3;

                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
                i++;
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null as any, null as any, PARTICLE_COUNT]}>
            <circleGeometry args={[0.07, 8]} />
            <meshBasicMaterial 
                color="#ffffff" 
                transparent={true} 
                opacity={0.35} 
                depthWrite={false} 
            />
        </instancedMesh>
    );
}

// Wrapper Principal
export default function ParticleWaveBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { rootMargin: '200px' } 
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F97316]/5 to-[#0B0F19] pointer-events-none z-10" />

            {/* Canvas sempre montado para evitar que o ThreeJS jogue crash ao tentar remontar o contexto WebGL constantemente, apenas gerenciamos o frameloop */}
            <Canvas
                camera={{ position: [0, 15, 20], fov: 45 }}
                frameloop={inView ? 'always' : 'never'} 
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance" 
                }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <ParticleWave />
            </Canvas>
        </div>
    );
}
