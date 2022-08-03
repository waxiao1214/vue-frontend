export const sortBy = (array, item, direction = true) => {
  if(direction)
    return array.sort((f, s) => f[item] > s[item])
  else return array.sort((f, s) => f[item] < s[item])
}