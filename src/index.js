const path = require("path");
const os = require("os");
const fs = require("fs-extra");
const mkdirp = require("mkdirp");
const fbx2gltf = require("@robertlong/fbx2gltf");
const { ConvertToGLB } = require("gltf-import-export");

function mergeIntoExtras(nodes, componentMap) {
  for (const nodeName in componentMap) {
    if (componentMap.hasOwnProperty(nodeName)) {
      const components = componentMap[nodeName];

      for (const node of nodes) {
        if (node.name && node.name === nodeName) {
          node.extras = Object.assign(node.extras || {}, {
            components
          });
        }
      }
    }
  }

  return nodes;
}

async function convert(srcFile, options) {
  const opts = Object.assign(
    {
      out: path.dirname(srcFile),
      name: path.basename(srcFile, ".fbx"),
      components: null,
      unlit: false
    },
    options
  );

  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "fbx-gltf-pipeline-")
  );

  const fbx2gltfDest = path.join(tempDir, opts.name + ".gltf");

  const args = [];

  if (opts.unlit) {
    args.push("--khr-materials-unlit");
  }

  const gltfPath = await fbx2gltf(srcFile, fbx2gltfDest, args);

  const gltf = await fs.readJSON(gltfPath);

  if (opts.components && fs.existsSync(opts.components)) {
    const { scenes, nodes } = await fs.readJSON(opts.components);

    if (scenes) {
      gltf.scenes = mergeIntoExtras(gltf.scenes, scenes);
    }

    if (nodes) {
      gltf.nodes = mergeIntoExtras(gltf.nodes, nodes);
    }
  }

  const outFile = path.join(opts.out, opts.name + ".glb");

  mkdirp.sync(opts.out);

  ConvertToGLB(gltf, gltfPath, outFile);

  return;
}

module.exports = convert;
