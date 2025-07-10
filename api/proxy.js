import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const PROXY_TARGETS = [
  { path: "/api/proxy/openai", target: "https://api.openai.com" },
  {
    path: "/api/proxy/google",
    target: "https://generativelanguage.googleapis.com",
  },
  { path: "/api/proxy/anthropic", target: "https://api.anthropic.com" },
  { path: "/api/proxy/elevenlabs", target: "https://api.elevenlabs.io" },
];

PROXY_TARGETS.forEach(({ path, target }) => {
  app.use(
    path,
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
      pathRewrite: {
        [`^${path}`]: "",
      },
    })
  );
});

export default app;
