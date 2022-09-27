export default function () {
  const comoputedRootStyles = getComputedStyle(document.documentElement)
  // [1,2,3] <==> [4,5,6]
  const nord1 = comoputedRootStyles.getPropertyValue('--nord1')
  const nord2 = comoputedRootStyles.getPropertyValue('--nord2')
  const nord3 = comoputedRootStyles.getPropertyValue('--nord3')
  const nord4 = comoputedRootStyles.getPropertyValue('--nord4')
  const nord5 = comoputedRootStyles.getPropertyValue('--nord5')
  const nord6 = comoputedRootStyles.getPropertyValue('--nord6')

  const rootStyles = document.documentElement.style
  rootStyles.setProperty('--nord1', nord6)
  rootStyles.setProperty('--nord2', nord5)
  rootStyles.setProperty('--nord3', nord4)
  rootStyles.setProperty('--nord4', nord3)
  rootStyles.setProperty('--nord5', nord2)
  rootStyles.setProperty('--nord6', nord1)
}
