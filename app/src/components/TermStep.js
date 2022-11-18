import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'

const TermStep = ({ formData, setFormData }) => {
  const [terms, setTerms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/terms`)
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
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 21c.5 -4.5 2.5 -8 7 -10"></path>
      <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z"></path>
    </svg>
  )
  
  const winterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10 4l2 1l2 -1"></path>
      <path d="M12 2v6.5l3 1.72"></path>
      <path d="M17.928 6.268l.134 2.232l1.866 1.232"></path>
      <path d="M20.66 7l-5.629 3.25l.01 3.458"></path>
      <path d="M19.928 14.268l-1.866 1.232l-.134 2.232"></path>
      <path d="M20.66 17l-5.629 -3.25l-2.99 1.738"></path>
      <path d="M14 20l-2 -1l-2 1"></path>
      <path d="M12 22v-6.5l-3 -1.72"></path>
      <path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232"></path>
      <path d="M3.34 17l5.629 -3.25l-.01 -3.458"></path>
      <path d="M4.072 9.732l1.866 -1.232l.134 -2.232"></path>
      <path d="M3.34 7l5.629 3.25l2.99 -1.738"></path>
    </svg>
  )
  
  const springIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3"></path>
      <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3"></path>
      <line x1={12} y1={20} x2={12} y2={10}></line>
    </svg>
  )
  
  const termIcons = new Map([
    ['Fall', fallIcon],
    ['Winter', winterIcon],
    ['Spring', springIcon]
  ])
  
  return (
    <div>
      <div className="text-gray-500 dark:text-gray-400 font-semibold mb-6">Step 1 of 3</div>
      <h1 className="text-3xl xl:text-5xl 2xl:text-6xl font-bold mb-10">What term would you like to generate schedules for?</h1>
      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {!error ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {terms.map((term, index) => (
                <label key={index}>
                  <input className="peer hidden" name="term" type="radio" value={term.id} checked={formData.term === term.id} onChange={setTerm} />
                  <div className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-8 rounded-md flex flex-col items-center border-2 border-transparent peer-checked:border-indigo-500">
                    {termIcons.get(term.name.split(' ')[0])}
                    <div className="text-lg font-semibold">{term.name}</div>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div>{error}</div>
          )}
        </>
      )}
    </div>
  )
}

export default TermStep