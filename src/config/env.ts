import { z } from 'zod';

const createEnv = () => {
  const Schemas = z.object({
    API_URL: z.string(),
    APP_URL: z.string(),
  });

  const envVars = Object.entries(import.meta.env).reduce<Record<string, string>>((acc, curr) => {
    let [key, value] = curr;
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value;
    }

    return acc;
  }, {});

  let parsedEnv = Schemas.safeParse(envVars);
  if (!parsedEnv.success) {
    let formattedErrors = parsedEnv.error.issues
      .map((e) => `- ${e.path.join('.')}: ${e.message}`).join('\n');

    throw new Error(`Invalid env provided. The following variables are missing or invalid:\n${formattedErrors}`);
  }

  return parsedEnv.data;
}

export const env = createEnv();