import { useEffect, useMemo, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const StlModel = ({ url, wireframe, shadows, onReady }) => {
    const meshRef = useRef(null);

    const loadedGeometry = useLoader(STLLoader, url);

    const geometry = useMemo(() => {
        const clonedGeometry = loadedGeometry.clone();

        clonedGeometry.computeVertexNormals();
        clonedGeometry.center();

        return clonedGeometry;
    }, [loadedGeometry]);

    useEffect(() => {
        if (meshRef.current) {
            onReady?.(meshRef.current, []);
        }
    }, [geometry, onReady]);

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            castShadow={shadows}
            receiveShadow={shadows}
        >
            <meshStandardMaterial
                color="#c9c9c9"
                metalness={0.15}
                roughness={0.6}
                wireframe={wireframe}
                vertexColors={Boolean(geometry.attributes.color)}
            />
        </mesh>
    );
};

export default StlModel;
