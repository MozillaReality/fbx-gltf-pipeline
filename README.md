# fbx-gltf-pipeline

## Install
```
npm install -g fbx-gltf-pipeline
```

## CLI Usage

```
  Usage: fbx-gltf-pipeline <src> [options]

  Options:

    -V, --version                  output the version number
    -o, --out <out>                The directory to output the file.
    -c, --components <components>  The path to the components json file
    -u, --unlit                    Use KHR_materials-unlit.
    -h, --help                     output usage information
```

## Components JSON Format:

```
fbx-gltf-pipeline <src> -c components.json
```

```json
{
  "components": {
    "GLTFNodeName": {
      "rotator": {
        "axis": { "x": 0, "y": 1, "z": 0 },
        "speed": 0.2
      },
      "text": [
        {
          "value": "A"
        },
        {
          "value": "B"
        },
        {
          "value": "C"
        }
      ]
    }
  }
}
```
