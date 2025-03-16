// import React, { Suspense, useEffect, useRef, useState } from "react";
// import { Canvas, useThree } from "@react-three/fiber";
// import { useCursor, useGLTF } from "@react-three/drei";
// import { gsap } from "gsap";
// import * as THREE from "three";
// import { useNavigate } from "react-router-dom";
//
// const Model = ({ onMonitorClick, setMonitorPosition }) => {
//     const { scene } = useGLTF("/assets/model/computerglb.glb");
//     const [hovered, setHovered] = useState(false);
//     const monitorRef = useRef(null);
//
//     useCursor(hovered);
//
//     useEffect(() => {
//         scene.traverse((child) => {
//             if (child.isMesh && child.name.includes("Monitor")) {
//                 monitorRef.current = child;
//                 child.userData.clickable = true;
//
//                 // ✅ Get Monitor's Exact Position in World Space
//                 const worldPosition = new THREE.Vector3();
//                 child.getWorldPosition(worldPosition);
//
//                 // ✅ Update state with monitor's position
//                 setMonitorPosition(worldPosition);
//             }
//         });
//     }, [scene, setMonitorPosition]);
//
//     return (
//         <primitive
//             object={scene}
//             onPointerOver={(e) => {
//                 if (e.object.userData.clickable) setHovered(true);
//             }}
//             onPointerOut={() => setHovered(false)}
//             onClick={(e) => {
//                 if (e.object.userData.clickable) {
//                     onMonitorClick();
//                 }
//             }}
//             scale={[1, 1, 1]}
//             position={[0, -1, 0]}
//         />
//     );
// };
//
// const CameraController = ({ zoomToMonitor, monitorPosition }) => {
//     const { camera } = useThree();
//     const isAnimating = useRef(false);
//     const navigate = useNavigate(); // ✅ React Router navigation
//
//     useEffect(() => {
//         // ✅ Set the initial fixed camera position (side view)
//         camera.position.set(2.891, 4.259, -7.097);
//         camera.rotation.set(-2.756, 0.860, 2.843);
//     }, [camera]);
//
//     useEffect(() => {
//         if (zoomToMonitor && monitorPosition && !isAnimating.current) {
//             isAnimating.current = true;
//             console.log("📷 Adjusting camera to monitor...");
//
//             // ✅ Corrected Target Position: Move up & right to match the monitor screen
//             const targetPosition = {
//                 x: monitorPosition.x - 7, // Slightly more to the right
//                 y: monitorPosition.y + 5.5, // Higher to align with monitor
//                 z: monitorPosition.z, // Forward towards the screen
//             };
//
//             // ✅ Animate camera to zoom in smoothly
//             gsap.to(camera.position, {
//                 ...targetPosition,
//                 duration: 1.5,
//                 ease: "power2.inOut",
//             });
//
//             // ✅ Rotate camera along Y-axis to face directly at the monitor
//             gsap.to(camera.rotation, {
//                 y: 1.4, // Flat-facing towards user
//                 duration: 1.5,
//                 ease: "power2.inOut",
//                 onComplete: () => {
//                     console.log("✅ Camera aligned, starting boot sequence...");
//                     navigate("/boot"); // ✅ Use React Router navigation
//                 },
//             });
//         }
//     }, [zoomToMonitor, monitorPosition, camera, navigate]);
//
//     return null;
// };
//
// const LandingPage = () => {
//     const [zoomToMonitor, setZoomToMonitor] = useState(false);
//     const [monitorPosition, setMonitorPosition] = useState(null);
//
//     return (
//         <div className="h-screen w-screen bg-zinc-800">
//             <Canvas shadows>
//                 <CameraController zoomToMonitor={zoomToMonitor} monitorPosition={monitorPosition} />
//
//                 {/* 🔆 Enhanced Lighting */}
//                 <ambientLight intensity={1.5} />
//                 <directionalLight position={[5, 10, 5]} intensity={3} castShadow />
//
//                 <Suspense fallback={null}>
//                     <Model onMonitorClick={() => setZoomToMonitor(true)} setMonitorPosition={setMonitorPosition} />
//                 </Suspense>
//             </Canvas>
//         </div>
//     );
// };
//
// export default LandingPage;
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useCursor, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const Model = ({ onMonitorClick, setMonitorPosition }) => {
    const { scene } = useGLTF("/assets/model/computerglb.glb");
    const [hovered, setHovered] = useState(false);
    const monitorRef = useRef(null);

    useCursor(hovered);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.envMapIntensity = 1;
                child.material.metalness = 1;
                child.material.roughness = 0.1;
            }

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
    const { camera, scene, gl } = useThree();
    const isAnimating = useRef(false);
    const navigate = useNavigate(); // ✅ React Router navigation

    useEffect(() => {
        // ✅ Set the initial fixed camera position (side view)
        camera.position.set(0.032, 0.121, 0.5);
        camera.rotation.set(-0.521, 0.468, 0.253);
    }, [camera]);

    useEffect(() => {
        // ✅ Load HDRI for realistic reflections
        const loader = new RGBELoader();
        loader.load("/assets/hdri/studio_1k.hdr", (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
            scene.background = null; // Keeps the background transparent while applying reflections
        });
    }, [scene]);

    useEffect(() => {
        // ✅ Enable proper tone mapping
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
    }, [gl]);

    useEffect(() => {
        if (zoomToMonitor && monitorPosition && !isAnimating.current) {
            isAnimating.current = true;
            console.log("📷 Adjusting camera to monitor...");

            const targetPosition = {
                x: monitorPosition.x + 0.11,
                y: monitorPosition.y,
                z: monitorPosition.z,
            };

            gsap.to(camera.position, {
                ...targetPosition,
                duration: 1.5,
                ease: "power2.inOut",
            });

            gsap.to(camera.rotation, {
                x: 0,
                y: 1.65,
                z: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    console.log("✅ Camera aligned, starting boot sequence...");
                    navigate("/boot");
                },
            });
        }
    }, [zoomToMonitor, monitorPosition, camera, navigate]);

    return null;
};

const LandingPage = () => {
    const [zoomToMonitor, setZoomToMonitor] = useState(false);
    const [monitorPosition, setMonitorPosition] = useState(null);

    return (
        <div className="h-screen w-screen bg-zinc-800">
            <Canvas shadows>
                <CameraController zoomToMonitor={zoomToMonitor} monitorPosition={monitorPosition} />

                {/* 🔆 Enhanced Lighting */}
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 10, 5]} intensity={3} castShadow />

                <Suspense fallback={null}>
                    <Model onMonitorClick={() => setZoomToMonitor(true)} setMonitorPosition={setMonitorPosition} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default LandingPage;

// import React, { Suspense, useRef } from "react";
// import { Canvas, useThree } from "@react-three/fiber";
// import { OrbitControls, useCursor, useGLTF } from "@react-three/drei";
// import { useNavigate } from "react-router-dom";
//
// const Model = () => {
//     const { scene } = useGLTF("/assets/model/computerglb.glb");
//     const navigate = useNavigate();
//     const [hovered, setHovered] = React.useState(false);
//
//     useCursor(hovered);
//
//     scene.traverse((child) => {
//         if (child.isMesh && child.name === "Monitor_27'_Curved") {
//             child.userData.clickable = true;
//         }
//     });
//
//     return (
//         <primitive
//             object={scene}
//             onPointerOver={(e) => {
//                 if (e.object.userData.clickable) setHovered(true);
//             }}
//             onPointerOut={() => setHovered(false)}
//             onClick={(e) => {
//                 if (e.object.userData.clickable) {
//                     navigate("/boot");
//                 }
//             }}
//             scale={[1, 1, 1]}
//             position={[0, -1, 0]}
//         />
//     );
// };
//
// const CameraLogger = () => {
//     const { camera } = useThree();
//     const cameraRef = useRef(camera);
//
//     useThree(({ camera }) => {
//         cameraRef.current = camera;
//         console.log("Camera Position:", camera.position);
//         console.log("Camera Rotation:", camera.rotation);
//     });
//
//     return null;
// };
//
// const LandingPage = () => {
//     return (
//         <div className="h-screen w-screen">
//             <Canvas shadows camera={{ position: [-5, 2, 3], fov: 50 }}>
//                 <ambientLight intensity={0.6} />
//                 <directionalLight position={[3, 5, 2]} castShadow />
//                 <Suspense fallback={null}>
//                     <Model />
//                 </Suspense>
//                 <OrbitControls />
//                 <CameraLogger />
//             </Canvas>
//         </div>
//     );
// };
//
// export default LandingPage;
