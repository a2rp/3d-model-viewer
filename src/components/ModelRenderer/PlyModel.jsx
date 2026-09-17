import { useEffect, useMemo, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

const PlyModel = ({ url, wireframe, shadows, onReady }) => {
    const meshRef = useRef(null);

    const loadedGeometry = useLoader(PLYLoader, url);

    const geometry = useMemo(() => {
        const clonedGeometry = loadedGeometry.clone();

        if (!clonedGeometry.attributes.normal) {
            clonedGeometry.computeVertexNormals();
        }

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
                color={geometry.attributes.color ? "#ffffff" : "#c9c9c9"}
                vertexColors={Boolean(geometry.attributes.color)}
                metalness={0.05}
                roughness={0.7}
                wireframe={wireframe}
            />
        </mesh>
    );
};

export default PlyModel;
