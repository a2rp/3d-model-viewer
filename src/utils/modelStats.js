import * as THREE from "three";

const getMaterialCount = (object) => {
    const materials = new Set();

    object.traverse((child) => {
        if (!child.isMesh) {
            return;
        }

        const materialList = Array.isArray(child.material)
            ? child.material
            : [child.material];

        materialList.filter(Boolean).forEach((material) => {
            materials.add(material.uuid || material.name || material);
        });
    });

    return materials.size;
};

export const calculateModelStats = (object, animationNames = []) => {
    if (!object) {
        return null;
    }

    let meshes = 0;
    let vertices = 0;
    let triangles = 0;

    object.updateMatrixWorld(true);

    object.traverse((child) => {
        if (!child.isMesh || !child.geometry) {
            return;
        }

        meshes += 1;

        const geometry = child.geometry;
        const position = geometry.attributes?.position;

        if (position) {
            vertices += position.count;
        }

        if (geometry.index) {
            triangles += geometry.index.count / 3;
        } else if (position) {
            triangles += position.count / 3;
        }
    });

    const boundingBox = new THREE.Box3().setFromObject(object);

    const dimensions = new THREE.Vector3();

    if (!boundingBox.isEmpty()) {
        boundingBox.getSize(dimensions);
    }

    return {
        meshes,
        vertices: Math.round(vertices),
        triangles: Math.round(triangles),
        materials: getMaterialCount(object),
        animations: animationNames.length,
        dimensions: {
            x: dimensions.x,
            y: dimensions.y,
            z: dimensions.z,
        },
    };
};

export const getModelBoundingBox = (object) => {
    if (!object) {
        return null;
    }

    object.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(object);

    if (box.isEmpty()) {
        return null;
    }

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    return {
        box,
        size,
        center,
        maxDimension: Math.max(size.x, size.y, size.z),
    };
};

export default calculateModelStats;
