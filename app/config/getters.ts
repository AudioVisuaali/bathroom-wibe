export function requireEnvInt(key: string): number {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    throw new Error(
      `Environment variable ${key} must be a valid integer but got "${value}"`,
    );
  }

  return parsed;
}

export function requireEnv<T extends string>(name: string, values?: T[]): T {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }

  if (values && !values.includes(value as T)) {
    throw new Error(
      `Environment variable ${name} must be one of ${values.join(", ")} but got "${value}"`,
    );
  }

  return value as T;
}
