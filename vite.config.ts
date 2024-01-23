import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    base: "./",
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"],
        dts: path.resolve(
          path.resolve(__dirname, "./src") + "\\autoImport",
          "auto-imports.d.ts"
        ),
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      host: "0.0.0.0", // 指定服务器应该监听哪个 IP 地址
      port: 9527, // 指定开发服务器端口
      strictPort: true, // 若端口已被占用则会直接退出
      open: false, // 启动时自动在浏览器中打开应用程序
      proxy: {
        "/api": {
          target: loadEnv(mode, process.cwd()).VITE_BASE_URL, // 后端服务实际地址
          changeOrigin: true, //开启代理
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "y_pin", // 生成输出的根目录。如果该目录存在，则会在生成之前将其删除。 默认文件夹名称为dist
      target: "esnext",
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去掉控制台 console
          drop_debugger: true, // 生产环境去掉控制台 debugger 默认就是true
          dead_code: true, // 删除无法访问的代码 默认就是true
        },
      },
      chunkSizeWarningLimit: 2000, // 调整区块大小警告限制
    },
  });
