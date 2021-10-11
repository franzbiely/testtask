

const {useState, useEffect} = React
const e = React.createElement;

const ImageGridViewRenderer = (props) => {
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [type, setType] = useState('nature')
  const [loading, setLoading] = useState(false)

  const nextLink = window.location.search.split('&page')[0] + '&page=' + (page + 1)
  const prevLink = window.location.search.split('&page')[0] + '&page=' + (page - 1)

  const init = () => {
    if (window.location.search.includes('page')) {
      setPage(Number(window.location.search.split('page=')[1]))
    }
    
    if(window.location.search.includes('nature')) {
      setType('nature')
    }
    else if(window.location.search.includes('architecture')) {
      setType('architecture')
    }
    else if(window.location.search.includes('fashion')) {
      setType('fashion')
    }
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    fetchType();
  }, [type])

  const fetchType = async () => {
    let rows = 3 
    let newImage;
    const newImages = [...images]
    setLoading(true)
    while(rows > 0) {
      rows--;
      
      if(type==='nature')
        newImage = await ImageDataGetter.getNatureImagesFromPage((page * 3) - rows)
      if(type==='architecture')
        newImage = await ImageDataGetter.getArchitectureImagesFromPage((page * 3) - rows)
      if(type==='fashion')
        newImage = await ImageDataGetter.getFashionImagesFromPage((page * 3) - rows)
      newImages.push(...newImage)
      setImages(newImages)
    }
    setLoading(false)
  }
  const renderImage = (item) => {
    return (
      <div class="col" style={{height: 400, padding: 10}}>
        <img class="image" src={item.url} alt={item.name} style={{height: "100%", objectFit: "cover", width: "100%"}} />
        <div class="middle">
          <a class="btn btn-dark" href={item.url} download={item.name}>DOWNLOAD</a>
        </div>
      </div>
    )
  }
  return (
    <React.Fragment>
      {
      loading && (
      <div className="spinnerContainer">
        <div className="spinner"></div>
      </div>
      )
      }
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Photo Sharing App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" href="?nature">Nature <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="?architecture">Architecture</a>
            <a class="nav-link" href="?fashion">Fashion</a>
          </div>
        </div>
      </nav>

      <div class="container">
        {
          images.length > 0 && 
          (
            <div id={`${type}-images`} class="row row-cols-3">
            {images.map(item => renderImage(item))}
            </div>
          )
        }
      </div>

      <nav>
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href={prevLink}>Previous</a></li>
          <li class="page-item"><a class="page-link" href={nextLink}>Next</a></li>
        </ul>
      </nav>
    </React.Fragment>
  )
}

const domContainer = document.querySelector('#main-view');
ReactDOM.render(e(ImageGridViewRenderer), domContainer);