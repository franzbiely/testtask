const apiUrl = 'http://localhost:8888'

const fetchImage = async (url) => {
  const response = await fetch(apiUrl + '/images' + url)
  const images = await response.json()
  return images
}

const ImageDataGetter = {
  getArchitectureImages : () => fetchImage("?category=architecture"),
  getFashionImages : () => fetchImage("?category=fashion"),
  getNatureImagesFromPage : (page) => fetchImage('?category=nature&page=' + page),
  getArchitectureImagesFromPage : (page) => fetchImage('?category=architecture&page=' + page),
  getFashionImagesFromPage : (page) => fetchImage('?category=fashion&page=' + page)
}