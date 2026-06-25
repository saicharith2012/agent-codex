export async function debug(name: string, data: unknown) {
  await Bun.write(
    `.debug/${name}.json`,
    JSON.stringify(data, null, 2),
  );
}