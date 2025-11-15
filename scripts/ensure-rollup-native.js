import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const packageName = '@rollup/rollup-linux-x64-gnu';
const nodeModulesPath = join(process.cwd(), 'node_modules', packageName);

// Check if already installed
if (existsSync(nodeModulesPath)) {
  console.log(`${packageName} already installed`);
  process.exit(0);
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
  process.exit(0);
}

