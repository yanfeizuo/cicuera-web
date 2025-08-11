import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default [
  // 主配置（生成 JS）
  {
    input: 'index.ts', // 入口文件
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',  // ESM 格式
        sourcemap: true
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',  // CommonJS 格式
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.build.json' }),
      postcss({
        modules: true, // 启用 CSS Modules
        extract: 'style.css', // 将 CSS 内联到 JS 中（设为 true 则输出单独 CSS 文件）
        autoModules: true, // 自动识别 .module.css 文件
        namedExports: true, // 允许通过命名导入 CSS
        minimize: true, // 生产环境压缩
      }),
      terser(),
    ],
    external: ['react', 'next'] // 外部依赖
  }
];