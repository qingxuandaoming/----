if (typeof globalThis !== 'undefined') {
  if (!globalThis.uni) {
    globalThis.uni = {}
  }
  if (typeof globalThis.uni.requireNativePlugin !== 'function') {
    globalThis.uni.requireNativePlugin = () => ({})
  }
  if (typeof globalThis.uni.upx2px !== 'function') {
    globalThis.uni.upx2px = (n) => Number(n)
  }
}