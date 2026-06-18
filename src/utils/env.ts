function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) throw new Error(`missing env variable ${name}.`);

  return value;
}

export const env = {
  groqAPIKey: requiredEnv("GROQ_API_KEY"),
  groqModel: requiredEnv("GROQ_MODEL"),
};
