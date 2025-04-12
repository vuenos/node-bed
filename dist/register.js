import { register } from 'tsconfig-paths';
import { resolve } from 'path';
import { readFileSync } from 'fs';
// tsconfig 에서 paths 와 baseUrl 읽기
const config = JSON.parse(readFileSync(resolve('./tsconfig.paths.json'), 'utf8'));
register({
    baseUrl: resolve('./src'),
    paths: config.compilerOptions.paths,
});
