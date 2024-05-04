export const truncateText = (text, length) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...` // Truncate and add ellipsis
  }
  return text
}
