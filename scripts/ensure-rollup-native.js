import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { platform, arch } from 'os';

// Determine the correct platform-specific package
const platformMap = {
  'linux': {
    'x64': '@rollup/rollup-linux-x64-gnu',
    'arm64': '@rollup/rollup-linux-arm64-gnu'
  },
  'darwin': {
    'x64': '@rollup/rollup-darwin-x64',
    'arm64': '@rollup/rollup-darwin-arm64'
  },
  'win32': {
    'x64': '@rollup/rollup-win32-x64-msvc',
    'arm64': '@rollup/rollup-win32-arm64-msvc'
  }
};

const currentPlatform = platform();
const currentArch = arch();
const rollupPackage = platformMap[currentPlatform]?.[currentArch];

const packages = [];
if (rollupPackage) {
  packages.push(rollupPackage);
}

// Only add lightningcss for Linux (Vercel uses Linux)
if (currentPlatform === 'linux') {
  packages.push('lightningcss-linux-x64-gnu');
}

if (packages.length === 0) {
  console.log('No platform-specific packages needed for this platform');
  process.exit(0);
}

for (const packageName of packages) {
  const nodeModulesPath = join(process.cwd(), 'node_modules', packageName);
  
  // Check if already installed
  if (existsSync(nodeModulesPath)) {
    console.log(`${packageName} already installed`);
    continue;
  }

  try {
    console.log(`Installing ${packageName}...`);
    execSync(`npm install --no-save ${packageName}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log(`Successfully installed ${packageName}`);
  } catch (error) {
    console.warn(`Failed to install ${packageName}, but continuing...`);
    // Don't fail the build
  }
}

