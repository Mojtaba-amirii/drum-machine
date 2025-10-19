const { existsSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

// Path to the react-scripts webpack dev server configuration
const webpackConfigPath = join(
  __dirname,
  "node_modules",
  "react-scripts",
  "config",
  "webpackDevServer.config.js"
);

if (existsSync(webpackConfigPath)) {
  let content = readFileSync(webpackConfigPath, "utf8");

  // Replace the deprecated onAfterSetupMiddleware and onBeforeSetupMiddleware with setupMiddlewares
  if (
    content.includes("onAfterSetupMiddleware") ||
    content.includes("onBeforeSetupMiddleware")
  ) {
    console.log(
      "Patching webpack-dev-server configuration for compatibility..."
    );

    // Replace the old middleware setup with the new setupMiddlewares API
    const oldMiddlewarePattern =
      /onBeforeSetupMiddleware\(devServer\) \{[\s\S]*?\},\s*onAfterSetupMiddleware\(devServer\) \{[\s\S]*?\},/;

    const newSetupMiddlewares = `setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Before middleware (evalSourceMapMiddleware and proxySetup)
      devServer.app.use(evalSourceMapMiddleware(devServer));
      
      if (fs.existsSync(paths.proxySetup)) {
        require(paths.proxySetup)(devServer.app);
      }

      // After middleware (redirectServedPath and noopServiceWorkerMiddleware)
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));

      return middlewares;
    },`;

    content = content.replace(oldMiddlewarePattern, newSetupMiddlewares);

    // Also fix the https option - replace it with server option
    content = content.replace(
      /https: getHttpsConfig\(\),/,
      "server: getHttpsConfig(),"
    );

    writeFileSync(webpackConfigPath, content);
    console.log("Successfully patched webpack-dev-server configuration!");
  } else {
    console.log("webpack-dev-server configuration is already compatible.");
  }
} else {
  console.log("webpack-dev-server configuration file not found.");
}

// Fix fs.F_OK deprecation warning in react-dev-utils
const checkRequiredFilesPath = join(
  __dirname,
  "node_modules",
  "react-dev-utils",
  "checkRequiredFiles.js"
);

if (existsSync(checkRequiredFilesPath)) {
  let content = readFileSync(checkRequiredFilesPath, "utf8");

  if (content.includes("fs.F_OK")) {
    console.log("Fixing fs.F_OK deprecation warning in react-dev-utils...");

    // Replace fs.F_OK with fs.constants.F_OK
    content = content.replace(/fs\.F_OK/g, "fs.constants.F_OK");

    writeFileSync(checkRequiredFilesPath, content);
    console.log("Successfully fixed fs.F_OK deprecation warning!");
  } else {
    console.log("fs.F_OK deprecation already fixed.");
  }
} else {
  console.log("checkRequiredFiles.js not found.");
}
