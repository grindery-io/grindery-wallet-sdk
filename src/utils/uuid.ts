/**
 * @summary Generates a Version 4 (pseudorandom) UUID
 * @returns {string} The UUID
 */
export const uuid = (): string => {
  let d = '';
  while (d.length < 32)
    d += Math.random()
      .toString(16)
      .substr(2);
  const vr = ((parseInt(d.substr(16, 1), 16) & 0x3) | 0x8).toString(16);
  return `${d.substr(0, 8)}-${d.substr(8, 4)}-4${d.substr(
    13,
    3
  )}-${vr}${d.substr(17, 3)}-${d.substr(20, 12)}`;
};
