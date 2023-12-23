export function getFullName(firstName, lastName) {
  return [firstName, lastName]
    .filter((value) => (value ?? null) !== null)
    .join(" ");
}

export function truncateText(text, length = 100) {
  return text.length < length ? text : text.slice(0, length) + "...";
}
