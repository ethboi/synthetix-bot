export function isValidEnsAddress(address: string): boolean {
  // ENS addresses should have a minimum of 7 characters, including the ".eth" TLD.
  if (address.length < 7) {
    return false
  }

  // A regex pattern to match a valid ENS address.
  const ensPattern = /^([a-zA-Z0-9]+\.)?([a-zA-Z0-9]+)\.eth$/

  return ensPattern.test(address)
}

function isAddress(value: string) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(value)) {
    // check if it has the basic requirements of an address
    return false
  } else if (/^(0x)?[0-9a-f]{40}$/.test(value) || /^(0x)?[0-9A-F]{40}$/.test(value)) {
    // If it's all small caps or all all caps, return true
    return true
  }
  return false
}
