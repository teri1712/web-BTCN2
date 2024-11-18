async function downloadData(path) {
  const response = await fetch(`http://matuan.online:2422/api/` + path)
  if (!response.ok) {
    window.alert(response.statusText)
    return
  }
  return await response.json()
}
let top5Revenue = null
const moviesData = downloadData('Movies')
const namesData = downloadData('Names')
const reviewsData = downloadData('Reviews')
const top50Data = downloadData('Top50Movies')
const popularsData = downloadData('MostPopularMovies')

function prepareMovie(movie) {
  movie.genre = movie.genreList.map((item) => item.key)
  movie.director = movie.directorList.map((item) => item.name)
}

async function prepareActor(actor) {
  actor.movies = []
  const movies = await moviesData
  for (let i = 0; i < actor.castMovies.length; i++) {
    const movieId = actor.castMovies[i].id
    for (let j = 0; j < movies.length; j++) {
      if (movies[j].id === movieId) {
        actor.movies.push(movies[j])
        break
      }
    }
  }
}

async function prepareReviews(movie) {
  const reviews = await reviewsData
  let movie_reviews = []
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].movieId === movie.id) {
      movie_reviews = reviews[i].items
      break
    }
  }
  movie.reviews = movie_reviews
}

export default async function dbFetch(url) {
  console.log(url)
  const [path, query] = url.split('?')
  const [type, className, pattern] = path.split('/')
  const params = {}
  if (query) {
    query.split('&').forEach((param) => {
      const [key, value] = param.split('=')
      params[key] = value
    })
  }
  const result = {}
  if (type === 'search') {
    const per_page = params.per_page
    const page = params.page
    const offset = (page - 1) * per_page

    result.items = []
    result.per_page = per_page
    result.page = page
    result.search = pattern

    if (className === 'movie') {
      const movies = await moviesData
      const filtered = []
      for (let i = 0; i < movies.length; i++) {
        let regex = new RegExp(pattern)
        if (regex.test(movies[i].title)) {
          prepareMovie(movies[i])
          filtered.push(movies[i])
        }
      }

      result.total_page = filtered.length / per_page
      result.total = filtered.length

      for (let i = offset; i < Math.min(filtered.length, offset + per_page); i++) {
        result.items.push(filtered[i])
      }
    } else if (className === 'name') {
      const names = await namesData

      const filtered = []
      for (let i = 0; i < names.length; i++) {
        let regex = new RegExp(pattern)
        if (regex.test(names[i].title)) {
          filtered.push(names[i])
        }
      }

      result.total_page = filtered.length / per_page
      result.total = filtered.length

      for (let i = offset; i < Math.min(filtered.length, offset + per_page); i++) {
        result.items.push(filtered[i])
      }
    }
  }
  if (type === 'get') {
    const per_page = params.per_page
    const page = params.page
    const offset = (page - 1) * per_page

    result.items = []
    result.per_page = per_page
    result.page = page

    if (className === 'top50') {
      const top50 = await top50Data
      result.total_page = top50.length / per_page
      result.total = top50.length

      for (let i = offset; i < Math.min(top50.length, offset + per_page); i++) {
        result.items.push(top50[i])
      }
    } else if (className === 'mostpopular') {
      const populars = await popularsData
      result.total_page = populars.length / per_page
      result.total = populars.length

      for (let i = offset; i < Math.min(populars.length, offset + per_page); i++) {
        result.items.push(populars[i])
      }
    } else if (className === 'top5revenue') {
      const movies = await moviesData
      if (top5Revenue == null) {
        top5Revenue = [...movies]
        top5Revenue.sort((a, b) => {
          let revenueA = !a.boxOffice
            ? -1
            : parseFloat(a.boxOffice.cumulativeWorldwideGross.replace(/[$,]/g, ''))
          let revenueB = !b.boxOffice
            ? -1
            : parseFloat(b.boxOffice.cumulativeWorldwideGross.replace(/[$,]/g, ''))
          return revenueB - revenueA
        })
        top5Revenue = top5Revenue.slice(0, 5)
        for (let i = 0; i < 5; i++) {
          prepareMovie(top5Revenue[i])
        }
      }
      result.items = top5Revenue
    }
  } else if (type === 'detail') {
    if (className === 'movie') {
      const movies = await moviesData

      result.id = pattern
      result.detail = null
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === pattern) {
          prepareMovie(movies[i])
          prepareReviews(movies[i])
          result.detail = movies[i]
          break
        }
      }
    } else if (className === 'actor') {
      const actors = await namesData
      result.items = []
      for (let i = 0; i < actors.length; i++) {
        if (actors[i].id === pattern) {
          prepareActor(actors[i])
          result.detail = actors[i]
          break
        }
      }
    }
  }
  return result
}
