import { useState, useEffect } from 'react'

const TermStep = ({ formData, setFormData }) => {
  const [terms, setTerms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/terms')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK')
      }
      return response.json()
    })
    .then((data) => {
      setTerms(data)
      setError(null)
    })
    .catch((error) => {
      setError(error.message)
      setTerms(null)
    })
    .finally(() => setLoading(false))
  }, [])
  
  const setTerm = (event) => {
    setFormData({...formData, term: event.target.value})
  }
  
  const fallIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 512 512">
      <title>Leaf</title>
      <path d="M161.35 242a16 16 0 0122.62-.68c73.63 69.36 147.51 111.56 234.45 133.07 11.73-32 12.77-67.22 2.64-101.58-13.44-45.59-44.74-85.31-90.49-114.86-40.84-26.38-81.66-33.25-121.15-39.89-49.82-8.38-96.88-16.3-141.79-63.85-5-5.26-11.81-7.37-18.32-5.66-7.44 2-12.43 7.88-14.82 17.6-5.6 22.75-2 86.51 13.75 153.82 25.29 108.14 65.65 162.86 95.06 189.73 38 34.69 87.62 53.9 136.93 53.9a186 186 0 0027.77-2.04c41.71-6.32 76.43-27.27 96-57.75-89.49-23.28-165.94-67.55-242-139.16a16 16 0 01-.65-22.65zM467.43 384.19c-16.83-2.59-33.13-5.84-49-9.77a157.71 157.71 0 01-12.13 25.68c-.73 1.25-1.5 2.49-2.29 3.71a584.21 584.21 0 0058.56 12 16 16 0 104.87-31.62z"/>
    </svg>
  )
  
  const winterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 512 512">
      <title>Snow</title>
      <path d="M461 349l-34-19.64a89.53 89.53 0 0120.94-16 22 22 0 00-21.28-38.51 133.62 133.62 0 00-38.55 32.1L300 256l88.09-50.86a133.46 133.46 0 0038.55 32.1 22 22 0 1021.28-38.51 89.74 89.74 0 01-20.94-16l34-19.64A22 22 0 10439 125l-34 19.63a89.74 89.74 0 01-3.42-26.15A22 22 0 00380 96h-.41a22 22 0 00-22 21.59 133.61 133.61 0 008.5 49.41L278 217.89V116.18a133.5 133.5 0 0047.07-17.33 22 22 0 00-22.71-37.69A89.56 89.56 0 01278 71.27V38a22 22 0 00-44 0v33.27a89.56 89.56 0 01-24.36-10.11 22 22 0 10-22.71 37.69A133.5 133.5 0 00234 116.18v101.71L145.91 167a133.61 133.61 0 008.52-49.43 22 22 0 00-22-21.59H132a22 22 0 00-21.59 22.41 89.74 89.74 0 01-3.41 26.19L73 125a22 22 0 10-22 38.1l34 19.64a89.74 89.74 0 01-20.94 16 22 22 0 1021.28 38.51 133.62 133.62 0 0038.55-32.1L212 256l-88.09 50.86a133.62 133.62 0 00-38.55-32.1 22 22 0 10-21.28 38.51 89.74 89.74 0 0120.94 16L51 349a22 22 0 1022 38.1l34-19.63a89.74 89.74 0 013.42 26.15A22 22 0 00132 416h.41a22 22 0 0022-21.59 133.61 133.61 0 00-8.5-49.41L234 294.11v101.71a133.5 133.5 0 00-47.07 17.33 22 22 0 1022.71 37.69A89.56 89.56 0 01234 440.73V474a22 22 0 0044 0v-33.27a89.56 89.56 0 0124.36 10.11 22 22 0 0022.71-37.69A133.5 133.5 0 00278 395.82V294.11L366.09 345a133.61 133.61 0 00-8.52 49.43 22 22 0 0022 21.59h.43a22 22 0 0021.59-22.41 89.74 89.74 0 013.41-26.19l34 19.63A22 22 0 10461 349z"/>
    </svg>
  )
  
  const springIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 512 512">
      <title>Flower</title>
      <circle cx="256" cy="256" r="48"/>
      <path d="M475.93 303.91a67.49 67.49 0 00-44.34-115.53 5.2 5.2 0 01-4.58-3.21 5.21 5.21 0 011-5.51A67.83 67.83 0 00378 66.33h-.25A67.13 67.13 0 00332.35 84a5.21 5.21 0 01-5.52 1 5.23 5.23 0 01-3.22-4.58 67.68 67.68 0 00-135.23 0 5.2 5.2 0 01-3.21 4.58 5.21 5.21 0 01-5.52-1 67.11 67.11 0 00-45.44-17.69H134a67.91 67.91 0 00-50 113.34 5.21 5.21 0 011 5.51 5.2 5.2 0 01-4.58 3.21 67.71 67.71 0 000 135.23 5.23 5.23 0 014.58 3.23 5.22 5.22 0 01-1 5.52 67.54 67.54 0 0050.08 113h.25A67.38 67.38 0 00179.65 428a5.21 5.21 0 015.51-1 5.2 5.2 0 013.21 4.58 67.71 67.71 0 00135.23 0 5.23 5.23 0 013.22-4.58 5.21 5.21 0 015.51 1 67.38 67.38 0 0045.29 17.42h.25a67.48 67.48 0 0050.08-113 5.22 5.22 0 01-1-5.52 5.23 5.23 0 014.58-3.22 67.31 67.31 0 0044.4-19.77zM256 336a80 80 0 1180-80 80.09 80.09 0 01-80 80z"/>
    </svg>
  )
  
  const termIcons = new Map([
    ['Fall', fallIcon],
    ['Winter', winterIcon],
    ['Spring', springIcon]
  ])
  
  return (
    <div>
      <div className="text-gray-500 dark:text-gray-400 font-semibold mb-4">Step 1 of 3</div>
      <h1 className="text-3xl xl:text-5xl 2xl:text-6xl font-extrabold mb-8">What term would you like to generate schedules for?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {terms.map((term, index) => (
          <label key={index}>
            <input className="peer hidden" name="term" type="radio" value={term.id} checked={formData.term === term.id} onChange={setTerm} />
            <div className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-8 rounded-md flex flex-col items-center border-2 border-transparent peer-checked:border-indigo-500">
              {termIcons.get(term.name.split(' ')[0])}
              <div className="font-semibold">{term.name}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TermStep