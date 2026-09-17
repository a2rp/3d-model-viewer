# 3D Model Viewer

A browser-based 3D model viewer built with React, Three.js, React Three Fiber, and Drei.

Load, inspect, rotate, zoom, analyze, and capture popular 3D model formats directly in the browser.

## Features

- Drag and drop model loading
- Local file selection
- Orbit, pan, and zoom controls
- Automatic model fitting
- Camera reset
- Grid and axes helpers
- Wireframe mode
- Auto rotation
- Background controls
- Environment presets
- Lighting controls
- Shadow controls
- Fullscreen mode
- PNG screenshot capture
- Model statistics
- Animation controls for compatible animated models
- Keyboard shortcuts
- Responsive interface
- Local browser-based model processing
- Confirmation modal for destructive actions
- Built-in supported file format guide
- Clear compatibility and limitation information

## Supported Formats

| Format | Typical Use                  | Notes                                                  |
| ------ | ---------------------------- | ------------------------------------------------------ |
| GLB    | Web 3D, AR, VR, sharing      | Recommended format and usually self-contained          |
| GLTF   | Web and real-time 3D         | May reference external BIN and texture files           |
| OBJ    | General geometry exchange    | MTL and textures may be external                       |
| STL    | 3D printing and CAD exports  | Primarily geometry                                     |
| FBX    | Games, animation, DCC tools  | Compatibility may vary by exporter and asset structure |
| PLY    | 3D scanning and research     | Supports geometry and optional vertex colors           |
| 3MF    | Modern 3D printing           | Can include colors, materials, and metadata            |
| DAE    | COLLADA interchange          | Legacy format with varying exporter compatibility      |
| 3DS    | Legacy 3D Studio assets      | Basic geometry and materials                           |
| USDZ   | Apple AR and spatial content | Usually packaged                                       |
| WRL    | VRML content                 | Legacy format                                          |
| VRML   | Legacy web 3D                | Legacy compatibility                                   |

## Recommended Format

**GLB is recommended for the most reliable browser experience.**

A GLB file can package geometry, materials, textures, animations, and scene information into a single portable file.

## Format Information

### GLB

Best choice for browser-based viewing.

Common uses:

- Web 3D
- AR and VR
- Games
- Model sharing
- Real-time applications

Can contain:

- Geometry
- Materials
- Textures
- Animations
- Scene information

GLB is generally the easiest format to use because all required resources can be stored inside one file.

### GLTF

Designed for web and real-time 3D applications.

Can contain:

- Geometry
- Materials
- Textures
- Animations
- Scene information

Important:

GLTF files may reference separate `.bin` files and texture images. If those resources are not embedded or available, the model may appear incomplete.

### OBJ

Common general-purpose geometry exchange format.

Can contain:

- Vertices
- Faces
- UV coordinates
- Normals

Important:

Materials are often stored in a separate `.mtl` file and textures may also be external.

The viewer currently accepts one primary model file at a time, so separately referenced materials or textures may not load automatically.

### STL

Commonly used for:

- 3D printing
- CAD exports
- Manufacturing workflows

STL primarily contains triangle mesh geometry.

It normally does not contain:

- Rich materials
- Texture maps
- Skeletons
- Animations

### FBX

Commonly used in:

- Game development
- Character animation
- Digital content creation
- 3D asset exchange

FBX can contain:

- Meshes
- Materials
- Skeletons
- Animations

FBX geometry has been tested with real FBX assets.

Animation playback is supported when compatible animation clips are detected.

Compatibility can vary depending on:

- FBX exporter
- FBX version
- Animation structure
- Embedded resources
- External textures

### PLY

Commonly used for:

- 3D scanning
- Research
- Reconstructed geometry
- Point and mesh data

PLY can contain:

- Geometry
- Vertex colors
- Surface information

### 3MF

Modern 3D manufacturing and printing format.

Can contain:

- Meshes
- Colors
- Materials
- Manufacturing metadata

3MF is a richer alternative to traditional STL workflows.

### DAE

COLLADA interchange format.

Common in older 3D pipelines.

Can contain:

- Geometry
- Materials
- Scene information
- Animation data

Compatibility can vary depending on the exporting application.

### 3DS

Legacy 3D Studio format.

Can contain:

- Geometry
- Basic materials

It has technical limitations compared with modern 3D formats.

### USDZ

Commonly used for:

- Apple AR
- iPhone and iPad 3D experiences
- Spatial content

USDZ typically packages related resources into one asset.

### WRL and VRML

Legacy Virtual Reality Modeling Language formats.

Primarily supported for compatibility with older 3D assets and visualization workflows.

## Formats Requiring Conversion

The following native project or CAD formats are not directly supported:

- BLEND
- MAX
- MA
- MB
- STEP
- STP
- IGES
- IGS
- SLDPRT
- C4D

These formats should generally be converted to GLB, GLTF, OBJ, STL, FBX, or another supported format before loading them into the viewer.

## Viewer Controls

### Camera

Users can:

- Rotate around the model
- Zoom
- Pan
- Reset the camera
- Automatically fit the model into view

### Scene

Available controls include:

- Background color
- Environment preset
- Light intensity
- Grid
- Coordinate axes
- Wireframe mode
- Auto rotation
- Shadows

### Animation

For models containing compatible animation clips:

- Select an animation
- Play
- Pause
- Stop
- Loop
- Adjust playback speed

GLB and GLTF provide the most reliable animation workflow.

FBX animation support is available, but compatibility can vary depending on the exported asset.

## Model Information

The inspector can display:

- File name
- File format
- File size
- Mesh count
- Vertex count
- Triangle count
- Material count
- Animation count
- Model dimensions

These values are calculated from the loaded scene and are intended for inspection purposes.

## Screenshot Capture

The viewer can capture the WebGL canvas and save the current model view as a PNG image.

The generated image is downloaded locally through the browser.

## Fullscreen Mode

The 3D viewer supports the browser Fullscreen API.

Users can enter or exit fullscreen mode directly from the viewer toolbar.

## Keyboard Shortcuts

| Key   | Action                            |
| ----- | --------------------------------- |
| R     | Reset camera                      |
| F     | Fit model                         |
| G     | Toggle grid                       |
| A     | Toggle axes                       |
| W     | Toggle wireframe                  |
| P     | Capture screenshot                |
| Space | Play or pause supported animation |

## Privacy

Selected model files are processed locally inside the browser.

The application does not upload the selected model file to an application backend.

Temporary browser object URLs are used when required for local model processing.

Environment lighting presets may load supporting environment assets over the network.

## External Companion Files

The application currently accepts one primary model file at a time.

Some formats may reference additional resources:

- GLTF may reference BIN files and textures
- OBJ may reference MTL files and textures
- FBX may reference external textures
- DAE may reference external textures
- 3DS may reference external resources

These companion files are not automatically collected from the user's computer.

For the most reliable single-file experience, use GLB.

## Compatibility

A supported file extension does not guarantee that every file produced by every 3D application will load perfectly.

3D formats can vary based on:

- Exporter
- Software version
- File version
- Embedded resources
- External dependencies
- Materials
- Texture configuration
- Animation structure
- Model complexity

GLB is recommended whenever possible.

## Large Models

The application does not currently enforce a fixed model file-size limit.

Practical limits depend on:

- Browser memory
- GPU memory
- Device performance
- Texture resolution
- Number of meshes
- Number of vertices
- Model complexity

Very large or highly detailed models may take longer to parse, render, or interact with.

## Recommended Workflow

For the most reliable browser experience:

1. Export or convert the model to GLB.
2. Embed textures and materials whenever possible.
3. Optimize unnecessary geometry.
4. Reduce excessively large textures.
5. Verify animation clips after export.
6. Load the final model into the viewer.

## Tech Stack

- React
- Vite
- Three.js
- React Three Fiber
- Drei
- React Icons
- CSS Modules

## Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Create production build:

```bash
npm run build
```

## Deployment

The standalone application is intended to be deployed with GitHub Pages.

Repository:

https://github.com/a2rp/3d-model-viewer

Live application:

https://a2rp.github.io/3d-model-viewer/

The project is also structured for future integration with `ashishranjan.pages.dev`.

## Developer

Developed and maintained by [Ashish Ranjan](https://www.ashishranjan.net).

## Links

- [Portfolio](https://www.ashishranjan.net)
- [GitHub](https://github.com/a2rp)
- [CodePen](https://codepen.io/ash1198)
- [LinkedIn](https://www.linkedin.com/in/aashishranjan)
- [Facebook](https://www.facebook.com/aashishranjan)
- [YouTube](https://www.youtube.com/@a2rp)
- [Support Development](https://a2rp-donation-page.netlify.app/)

## License

This project is licensed under the MIT License.
