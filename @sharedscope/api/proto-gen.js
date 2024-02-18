#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");
const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config();
const fs = require("fs");
const glob = require("glob");
const ts = require("typescript");

function isNodeExported(node) {
  return (
    ts.isExportDeclaration(node) ||
    ts.isExportAssignment(node) ||
    (ts.isExportSpecifier(node) &&
      node.parent &&
      node.parent.parent &&
      node.parent.parent.kind === ts.SyntaxKind.NamedExports) ||
    (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
    (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
  );
}

function hasExports(node) {
  if (isNodeExported(node)) {
    return true;
  }

  return ts.forEachChild(node, hasExports);
}

function isTsHasExports(file) {
  const program = ts.createProgram([file], {});
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(file);
  let state = false;

  if (sourceFile) {
    state = hasExports(sourceFile);
  }

  return state;
}

function toPascalCase(str) {
  return str
    .replace(/(\w)(\w*)/g, function (g0, g1, g2) {
      return g1.toUpperCase() + g2.toLowerCase();
    })
    .replace(/[^a-z0-9]/gi, "");
}

async function generateIndex(sourceFile, directoryPath, moduleName) {
  // Use glob to find all .ts files in the directory and its subdirectories

  moduleName = moduleName.replace(".proto", "");

  sourceFile = sourceFile.endsWith("/") ? sourceFile : sourceFile + "/";

  const directoryPathWithSlash = directoryPath.endsWith("/")
    ? directoryPath
    : directoryPath + "/";

  const pattern = `${directoryPathWithSlash}**/*.ts`;
  console.log(chalk.green("Generating index.ts..."));
  console.log(chalk.yellow(`Pattern: ${pattern}`));

  const files = await glob.glob(pattern);

  let exportStatements = generateFileHeader(sourceFile, moduleName + ".proto");

  exportStatements =
    exportStatements +
    files
      // Exclude index.ts files
      .filter((file) => !file.endsWith("index.ts"))
      // Check each file for exports
      .map((file) => {
        const state = isTsHasExports(file);
        console.log(
          chalk.yellow(`Processing file:`) + `${file} [Export: ${state}]. `
        );

        if (state) {
          const absoluteFilePath = path.resolve(file);
          let targetPath = path.resolve(directoryPathWithSlash);
          targetPath = targetPath.endsWith("/") ? targetPath : targetPath + "/";

          const finalPath = absoluteFilePath
            .replace(targetPath, "")
            .replace(".ts", "");

          // Get the base name of the file to use as the export name
          const baseName = path.basename(finalPath);

          // Convert the base name to PascalCase and remove unsafe characters
          const alias = toPascalCase(baseName) + "Module";

          return `export * as ${alias} from './${finalPath}';\n`;
        } else {
          return "";
        }
      })
      .join("");

  console.log(chalk.yellow("\nExport statements:"));

  console.log(exportStatements);

  // Write the export statements to the index.ts file
  const indexFilePath = path.join(directoryPath, "index.ts");
  await fs.promises.writeFile(indexFilePath, exportStatements);
}

function generateProtoSource(src, dest, protoFile) {
  console.log(chalk.green("Generate proto source code..."));

  src = src.endsWith("/") ? src : src + "/";
  dest = dest.endsWith("/") ? dest : dest + "/";

  // Resolve the src is exist
  if (!fs.existsSync(src)) {
    throw new Error("Source directory does not exist.");
  }

  // Build the dir of dest
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  //protofile is exist
  if (!fs.existsSync(src + protoFile)) {
    throw new Error("Proto file does not exist.");
  }

  const PROTO_SRC = src;
  const PROTO_OUT = dest;
  // const CLIENT_TYPE = process.env.CLIENT_TYPE;

  console.log(chalk.yellow("PROTO_SRC: ") + PROTO_SRC);
  console.log(chalk.yellow("PROTO_OUT: ") + PROTO_OUT);
  console.log(chalk.yellow("PROTO_FILE: ") + protoFile);

  const nodeModulesBin = path.resolve(__dirname, "node_modules", ".bin");

  console.log(chalk.yellow("node_modules BIN: \n") + nodeModulesBin + "\n");

  console.log(
    chalk.green("Generating gRPC-Web client in using protobuf-ts...")
  );

  const command = `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_opt generate_dependencies --ts_out ${PROTO_OUT} --proto_path ${PROTO_SRC} ${PROTO_SRC}${protoFile}`;

  execSync(command, { stdio: "inherit" });

  // Left this commented out for future reference if
  // official grpc-web plugin is fully supported typescript esm

  // if (CLIENT_TYPE === "text") {
  //   console.log(chalk.green("Generating gRPC-Web client in text mode..."));
  //   const command = `protoc --proto_path=${PROTO_SRC} --plugin=${nodeModulesBin}/protoc-gen-grpc-web=${nodeModulesBin}/protoc-gen-grpc-web --grpc-web_out=import_style=typescript,mode=grpcwebtext:${PROTO_OUT} ${PROTO_SRC}/*.proto`;

  //   execSync(command, { stdio: "inherit" });
  // } else if (CLIENT_TYPE === "binary") {
  //   console.log(chalk.green("Generating gRPC-Web client in binary mode..."));
  //   const command = `protoc --proto_path=${PROTO_SRC} --plugin=${nodeModulesBin}/protoc-gen-ts=protoc-gen-ts --plugin=${nodeModulesBin}/protoc-gen-grpc-web=${nodeModulesBin}/protoc-gen-grpc-web --js_out=import_style=commonjs,binary:${PROTO_OUT} --grpc-web_out=import_style=typescript,mode=grpcweb:${PROTO_OUT} ${PROTO_SRC}/*.proto`;

  //   execSync(command, { stdio: "inherit" });
  // }

  console.log(chalk.green("Generation completed.\n"));
}

async function mainProcess([src, dest, protoFile]) {
  console.log(chalk.green(`${protoFile} :Generating proto source code...`));

  try {
    generateProtoSource(src, dest, protoFile);
    await generateIndex(src, dest, protoFile);
  } catch (error) {
    console.error(
      chalk.red("An error occurred during the generation process:")
    );
    console.error(chalk.red(error));
  }
}

function generateFileHeader(dest, protoFile) {
  return `// GENERATED CODE  -- DO NOT EDIT! \n// PROTO-GEN.JS v1.3 \n// PROTO SOURCE: ${dest}${protoFile} \n\n`;
}

function banner() {
  console.log(chalk.yellow("\nProto-gen Typescript Runner"));
  console.log(
    chalk.yellow(
      "-------------------------------------------------------------"
    )
  );
  console.log(
    chalk.cyan("Linggawasistha Djohari <linggawasistha.djohari@outlook.com>\n")
  );

  console.log(chalk.yellow(`Current working directory:`) + `${process.cwd()}`);
}

// Main
(async () => {
  banner();
  const cli = meow(
    `
  Usage
    $ node proto-gen.js --proto=[src,dest,proto]

  Options
    --proto  Specify the proto source folder, proto destination folder, proto filename. (Required)

  Examples
    $ node proto-gen.js --proto=/path/to/src,/path/to/dest,proto1.proto --proto=/path/to/src,/path/to/dest,proto2.proto
`,
    {
      flags: {
        proto: {
          type: "string",
          isRequired: true,
          isMultiple: true,
        },
      },
    }
  );

  const { proto } = cli.flags;
  const protoFiles = proto.map((file) => file.split(","));

  for (const file of protoFiles) {
    await mainProcess(file);
  }
})();
