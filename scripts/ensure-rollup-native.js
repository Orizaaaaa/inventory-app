import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const packages = [
  '@rollup/rollup-linux-x64-gnu',
  'lightningcss-linux-x64-gnu'
];

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

