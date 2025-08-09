declare global {
  interface Window {
    envs: Record<string, string>
  }
}

// so that TypeScript picks this up
export {};
