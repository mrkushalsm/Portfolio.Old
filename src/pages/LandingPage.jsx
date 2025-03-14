import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useCursor, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

const Model = ({ onMonitorClick, setMonitorPosition }) => {
    const { scene } = useGLTF("/assets/model/computerglb.glb");
    const [hovered, setHovered] = useState(false);
    const monitorRef = useRef(null);

    useCursor(hovered);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh && child.name.includes("Monitor")) {
                monitorRef.current = child;
                child.userData.clickable = true;

                // ✅ Get Monitor's Exact Position in World Space
                const worldPosition = new THREE.Vector3();
                child.getWorldPosition(worldPosition);

                // ✅ Update state with monitor's position
                setMonitorPosition(worldPosition);
            }
        });
    }, [scene, setMonitorPosition]);

    return (
        <primitive
            object={scene}
            onPointerOver={(e) => {
                if (e.object.userData.clickable) setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
            onClick={(e) => {
                if (e.object.userData.clickable) {
                    onMonitorClick();
                }
            }}
            scale={[1, 1, 1]}
            position={[0, -1, 0]}
        />
    );
};

const CameraController = ({ zoomToMonitor, monitorPosition }) => {
    const { camera } = useThree();
    const isAnimating = useRef(false);

    useEffect(() => {
        // ✅ Set the initial fixed camera position (side view)
        camera.position.set(2.891, 4.259, -7.097);
        camera.rotation.set(-2.756, 0.860, 2.843);
    }, [camera]);

    useEffect(() => {
        if (zoomToMonitor && monitorPosition && !isAnimating.current) {
            isAnimating.current = true;
            console.log("📷 Adjusting camera to monitor...");

            // ✅ Corrected Target Position: Move up & right to match the monitor screen
            const targetPosition = {
                x: monitorPosition.x - 7, // Slightly more to the right
                y: monitorPosition.y + 5.5,    // Higher to align with monitor
                z: monitorPosition.z,    // Forward towards the screen
            };

            // ✅ Animate camera to zoom in smoothly
            gsap.to(camera.position, {
                ...targetPosition,
                duration: 1.5,
                ease: "power2.inOut",
            });

            // ✅ Rotate camera along Y-axis to face directly at the monitor
            gsap.to(camera.rotation, {
                y: 1.4, // Flat-facing towards user
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    console.log("✅ Camera aligned, starting boot sequence...");
                    window.location.href = "/boot";
                },
            });
        }
    }, [zoomToMonitor, monitorPosition, camera]);

    return null;
};

const LandingPage = () => {
    const [zoomToMonitor, setZoomToMonitor] = useState(false);
    const [monitorPosition, setMonitorPosition] = useState(null);

    return (
        <div className="h-screen w-screen">
            <Canvas shadows>
                <CameraController zoomToMonitor={zoomToMonitor} monitorPosition={monitorPosition} />

                {/* 🔆 Enhanced Lighting */}
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 5]} intensity={3} castShadow={true} />

                <Suspense fallback={null}>
                    <Model onMonitorClick={() => setZoomToMonitor(true)} setMonitorPosition={setMonitorPosition} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default LandingPage;
