export function getFullName(firstName, lastName) {
  return [firstName, lastName]
    .filter((value) => (value ?? null) !== null)
    .join(" ");
}
