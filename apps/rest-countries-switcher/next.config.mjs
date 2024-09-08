// @ts-check

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MODE_DETECT: fs
      .readFileSync(
        path.resolve(__dirname, './src/components/Header/mode-detect.ts')
      )
      .toString(),
  },
};

export default nextConfig;
