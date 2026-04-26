'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Constantes
const PARTICLE_COUNT = 3500;
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

        for (let ix = 0; ix < Math.sqrt(PARTICLE_COUNT); ix++) {
            for (let iz = 0; iz < Math.sqrt(PARTICLE_COUNT); iz++) {
                const x = (ix / Math.sqrt(PARTICLE_COUNT) - 0.5) * range;
                const z = (iz / Math.sqrt(PARTICLE_COUNT) - 0.5) * range;
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

        // O mouse interage suavemente (coordenadas variam de -1 a 1 e multiplicamos para corresponder à escala mundial)
        const targetX = pointer.x * (viewport.width / 4);
        const targetY = pointer.y * (viewport.height / 4);

        let i = 0;
        for (let ix = 0; ix < Math.sqrt(PARTICLE_COUNT); ix++) {
            for (let iz = 0; iz < Math.sqrt(PARTICLE_COUNT); iz++) {
                const px = positions[i * 3];
                const pz = positions[i * 3 + 2];

                // Fórmulas matemáticas para onda
                const dx = px + time;
                const dz = pz + time;

                // Cria uma oscilação tipo relevo topográfico
                let py = Math.sin(dx * 0.3) * 1.5 + Math.cos(dz * 0.4) * 1.5;

                // Calcula a influência magnética do mouse (pequena elevação proxima ao cursor)
                // Assumindo que a câmera está olhando para as coordenadas cartesianas centrais
                const distToMouse = Math.sqrt(Math.pow(px - targetX, 2) + Math.pow(pz - targetY, 2));
                if (distToMouse < 8) {
                    const influence = (8 - distToMouse) * 0.3; // Eleva a partícula baseada na proximidade
                    py += influence;
                }

                dummy.position.set(px, py, pz);
                
                // Rotaciona a partícula lentamente para efeito sutil (caso não fosse uma esfera perfeita)
                dummy.rotation.x = time * 0.2;
                dummy.rotation.y = time * 0.3;

                // Atualiza em lote (batching process) reduzindo as dezenas de milhares de chamadas para drawcalls unitários para apenas 1 draw call global
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
                i++;
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
            <circleGeometry args={[0.07, 8]} />
            {/* Aspecto translúcido, respeitando a prop alpha do Canvas */}
            <meshBasicMaterial 
                color="#ffffff" 
                transparent={true} 
                opacity={0.35} 
                depthWrite={false} 
            />
        </instancedMesh>
    );
}

// Wrapper Principal que gerenciará o Observer e o framelogging
export default function ParticleWaveBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        
        // Performance Extrema:
        // O Observer avalia se estamos pertos desta div para habilitar os render loops e uso do WebGL da GPU.
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { rootMargin: '200px' } // Considera 200px antes de entrar na tela real
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Gradientes que adicionam aura Premium de Topografia e casam com a paleta VDA (Laranja, escuro profundo) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F97316]/5 to-[#0B0F19] pointer-events-none z-10" />

            {/* O Canvas só renderizará internamente quando inView = true frameloop demand vs always */}
            {inView && (
                <Canvas
                    camera={{ position: [0, 15, 20], fov: 45 }}
                    // Frameloop condicionado é a regra de ouro na otimização de React Three Fiber para Landing Pages
                    frameloop={inView ? 'always' : 'never'} 
                    gl={{
                        antialias: false,
                        alpha: true,
                        powerPreference: "high-performance" 
                    }}
                    dpr={[1, 2]} // Limita a resolução em monitores ultra resolutos para segurar os frames 60 constantes
                >
                    {/* Luzes Suaves */}
                    <ambientLight intensity={0.5} />
                    <ParticleWave />
                </Canvas>
            )}
        </div>
    );
}
