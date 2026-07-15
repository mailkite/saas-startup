#!/usr/bin/env node
import { spawn } from 'child_process';
import { readFileSync, writeFileSync, cpSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const projectDir = join(import.meta.dirname, '..');

const buildResult = spawn('npx', ['opennextjs-cloudflare', 'build'], {
  cwd: projectDir,
  stdio: 'inherit',
  shell: true,
});

buildResult.on('close', (code) => {
  if (code !== 0) {
    console.error('Build failed');
    process.exit(code);
  }

  const tempDir = join(projectDir, '.open-next-temp');
  rmSync(tempDir, { recursive: true, force: true });
  mkdirSync(tempDir, { recursive: true });

  cpSync(join(projectDir, '.open-next'), tempDir, { recursive: true });

  const wranglerConfig = JSON.parse(
    readFileSync(join(projectDir, 'wrangler.jsonc'), 'utf-8')
  );

  wranglerConfig.main = 'worker.js';
  wranglerConfig.assets = { directory: 'assets', binding: 'ASSETS' };

  writeFileSync(join(tempDir, 'wrangler.jsonc'), JSON.stringify(wranglerConfig, null, 2));

  const deployResult = spawn('npx', ['wrangler', 'deploy'], {
    cwd: tempDir,
    stdio: 'inherit',
    shell: true,
  });

  deployResult.on('close', (code) => {
    rmSync(tempDir, { recursive: true, force: true });
    process.exit(code);
  });
});
