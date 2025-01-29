declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      ADMIN_EMAIL: string;
      ADMIN_PASSWORD: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {} 