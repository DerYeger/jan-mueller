export const getImageAsset = (assets: Record<string, any>, image: string) =>
  assets.find((asset: any) => {
    if (!asset.default?.src) {
      return false
    }
    const index = asset.default.src.indexOf('/assets/')
    return asset.default.src.slice(index) === image
  })
