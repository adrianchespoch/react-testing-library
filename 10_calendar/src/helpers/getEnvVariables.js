export const getEnvVariables = () => {
  // // Al hacer el build marca error: vite issuses
  // import.meta.env;

  return {
    // ...import.meta.env,
    VITE_MODE: import.meta.env.VITE_MODE,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };
};
