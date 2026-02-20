// vite.config.js
import { defineConfig } from "file:///M:/project/%E5%81%A5%E5%BA%B7%E7%AE%A1%E7%90%86/uni-app/node_modules/vite/dist/node/index.js";
import fs from "fs";
import path from "path";
import uni from "file:///M:/project/%E5%81%A5%E5%BA%B7%E7%AE%A1%E7%90%86/uni-app/node_modules/@dcloudio/vite-plugin-uni/dist/index.js";
process.env.SASS_SILENCE_DEPRECATIONS = "legacy-js-api,import";
var uniPlugin = typeof uni === "function" ? uni : uni && typeof uni.default === "function" ? uni.default : null;
var wxsStubPlugin = {
  name: "wxs-stub",
  enforce: "pre",
  load(id) {
    if (id.includes(".wxs")) {
      return "export default {}";
    }
  }
};
var faviconPlugin = {
  name: "serve-favicon-svg",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/favicon.svg") {
        try {
          const filePath = path.resolve(process.cwd(), "public", "favicon.svg");
          const content = fs.readFileSync(filePath);
          res.statusCode = 200;
          res.setHeader("Content-Type", "image/svg+xml");
          res.setHeader("x-content-type-options", "nosniff");
          res.setHeader("Cache-Control", "no-cache");
          res.end(content);
          return;
        } catch (e) {
        }
      }
      next();
    });
  }
};
var vite_config_default = defineConfig({
  plugins: [
    wxsStubPlugin,
    faviconPlugin,
    uniPlugin ? uniPlugin({
      vueOptions: {
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ["view", "text", "image", "scroll-view", "swiper", "swiper-item"].includes(tag)
          }
        }
      }
    }) : []
  ].flat(),
  optimizeDeps: {
    exclude: ["uview-plus"]
  },
  server: {
    port: 5501,
    host: true,
    headers: {
      "x-content-type-options": "nosniff"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: '@import "uview-plus/theme.scss";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJNOlxcXFxwcm9qZWN0XFxcXFx1NTA2NVx1NUVCN1x1N0JBMVx1NzQwNlxcXFx1bmktYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJNOlxcXFxwcm9qZWN0XFxcXFx1NTA2NVx1NUVCN1x1N0JBMVx1NzQwNlxcXFx1bmktYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9NOi9wcm9qZWN0LyVFNSU4MSVBNSVFNSVCQSVCNyVFNyVBRSVBMSVFNyU5MCU4Ni91bmktYXBwL3ZpdGUuY29uZmlnLmpzXCI7cHJvY2Vzcy5lbnYuU0FTU19TSUxFTkNFX0RFUFJFQ0FUSU9OUyA9ICdsZWdhY3ktanMtYXBpLGltcG9ydCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHVuaSBmcm9tICdAZGNsb3VkaW8vdml0ZS1wbHVnaW4tdW5pJ1xuXG5jb25zdCB1bmlQbHVnaW4gPSB0eXBlb2YgdW5pID09PSAnZnVuY3Rpb24nID8gdW5pIDogKHVuaSAmJiB0eXBlb2YgdW5pLmRlZmF1bHQgPT09ICdmdW5jdGlvbicgPyB1bmkuZGVmYXVsdCA6IG51bGwpXG5cbmNvbnN0IHd4c1N0dWJQbHVnaW4gPSB7XG4gIG5hbWU6ICd3eHMtc3R1YicsXG4gIGVuZm9yY2U6ICdwcmUnLFxuICBsb2FkKGlkKSB7XG4gICAgaWYgKGlkLmluY2x1ZGVzKCcud3hzJykpIHtcbiAgICAgIHJldHVybiAnZXhwb3J0IGRlZmF1bHQge30nXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGZhdmljb25QbHVnaW4gPSB7XG4gIG5hbWU6ICdzZXJ2ZS1mYXZpY29uLXN2ZycsXG4gIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgaWYgKHJlcS51cmwgPT09ICcvZmF2aWNvbi5zdmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3B1YmxpYycsICdmYXZpY29uLnN2ZycpXG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aClcbiAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDIwMFxuICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdpbWFnZS9zdmcreG1sJylcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKCd4LWNvbnRlbnQtdHlwZS1vcHRpb25zJywgJ25vc25pZmYnKVxuICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tY2FjaGUnKVxuICAgICAgICAgIHJlcy5lbmQoY29udGVudClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cbiAgICAgIG5leHQoKVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHd4c1N0dWJQbHVnaW4sXG4gICAgZmF2aWNvblBsdWdpbixcbiAgICB1bmlQbHVnaW5cbiAgICAgID8gdW5pUGx1Z2luKHtcbiAgICAgICAgdnVlT3B0aW9uczoge1xuICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PiBbJ3ZpZXcnLCAndGV4dCcsICdpbWFnZScsICdzY3JvbGwtdmlldycsICdzd2lwZXInLCAnc3dpcGVyLWl0ZW0nXS5pbmNsdWRlcyh0YWcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgOiBbXVxuICBdLmZsYXQoKSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWyd1dmlldy1wbHVzJ11cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTUwMSxcbiAgICBob3N0OiB0cnVlLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICd4LWNvbnRlbnQtdHlwZS1vcHRpb25zJzogJ25vc25pZmYnXG4gICAgfVxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIHF1aWV0RGVwczogdHJ1ZSxcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwidXZpZXctcGx1cy90aGVtZS5zY3NzXCI7J1xuICAgICAgfVxuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUorUSxRQUFRLElBQUksNEJBQTRCO0FBTXZVLElBQU0sWUFBWSxPQUFPLFFBQVEsYUFBYSxNQUFPLE9BQU8sT0FBTyxJQUFJLFlBQVksYUFBYSxJQUFJLFVBQVU7QUFFOUcsSUFBTSxnQkFBZ0I7QUFBQSxFQUNwQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxLQUFLLElBQUk7QUFDUCxRQUFJLEdBQUcsU0FBUyxNQUFNLEdBQUc7QUFDdkIsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFNLGdCQUFnQjtBQUFBLEVBQ3BCLE1BQU07QUFBQSxFQUNOLGdCQUFnQixRQUFRO0FBQ3RCLFdBQU8sWUFBWSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7QUFDekMsVUFBSSxJQUFJLFFBQVEsZ0JBQWdCO0FBQzlCLFlBQUk7QUFDRixnQkFBTSxXQUFXLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxVQUFVLGFBQWE7QUFDcEUsZ0JBQU0sVUFBVSxHQUFHLGFBQWEsUUFBUTtBQUN4QyxjQUFJLGFBQWE7QUFDakIsY0FBSSxVQUFVLGdCQUFnQixlQUFlO0FBQzdDLGNBQUksVUFBVSwwQkFBMEIsU0FBUztBQUNqRCxjQUFJLFVBQVUsaUJBQWlCLFVBQVU7QUFDekMsY0FBSSxJQUFJLE9BQU87QUFDZjtBQUFBLFFBQ0YsU0FBUyxHQUFHO0FBQUEsUUFBQztBQUFBLE1BQ2Y7QUFDQSxXQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1A7QUFBQSxJQUNBO0FBQUEsSUFDQSxZQUNJLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxRQUNWLFVBQVU7QUFBQSxVQUNSLGlCQUFpQjtBQUFBLFlBQ2YsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFFBQVEsUUFBUSxTQUFTLGVBQWUsVUFBVSxhQUFhLEVBQUUsU0FBUyxHQUFHO0FBQUEsVUFDMUc7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQyxJQUNDLENBQUM7QUFBQSxFQUNQLEVBQUUsS0FBSztBQUFBLEVBQ1AsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFlBQVk7QUFBQSxFQUN4QjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsMEJBQTBCO0FBQUEsSUFDNUI7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixXQUFXO0FBQUEsUUFDWCxnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
