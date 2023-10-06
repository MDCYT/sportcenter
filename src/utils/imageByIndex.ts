
export const images: string[] = ['/images/carousel/1.png', '/images/carousel/1.png', '/images/carousel/1.png', '/images/carousel/1.png']

const imageByIndex = (index: number): string => images[index % images.length]

export default imageByIndex
