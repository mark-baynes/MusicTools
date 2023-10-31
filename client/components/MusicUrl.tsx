import { useState, useEffect } from 'react'
import { Url, NewUrl } from '../../models/Urls'
import AddUrl from '../components/AddUrl'
import EditUrl from '../components/EditUrl'
import { getUrls, deleteUrl, editUrl } from '../apiClient'

const MusicUrl = () => {
  const [urls, setUrls] = useState<Url[]>([])
  const [reloadUrls, setReloadUrls] = useState(true)
  const [selectedUrl, setSelectedUrl] = useState<Url | null>(null)
  const [showMusicUrl, setShowMusicUrl] = useState(true) // New state variable

  useEffect(() => {
    if (reloadUrls) {
      const fetchUrls = async () => {
        try {
          const response = await getUrls()
          setUrls(response)
        } catch (error) {
          console.log('An error occurred:', error)
        }
      }

      fetchUrls()
      setReloadUrls(false)
    }
  }, [reloadUrls])

  const handleDelete = async (id: number) => {
    try {
      await deleteUrl(id)
      setUrls(urls.filter((url) => url.id !== id))
    } catch (error) {
      console.log('Error deleting url:', error)
    }
  }

  const handleEdit = (id: number) => {
    const urlToEdit = urls.find((url) => url.id === id)
    if (urlToEdit) {
      setSelectedUrl(urlToEdit)
    }
  }

  const handleUpdate = async (updatedUrl: NewUrl) => {
    if (!selectedUrl) return
    try {
      await editUrl(selectedUrl.id, updatedUrl)
      setUrls(
        urls.map((url) =>
          url.id === selectedUrl.id
            ? { ...url, ...updatedUrl }
            : url
        )
      )
      setSelectedUrl(null)
    } catch (error) {
      console.error('Error updating url:', error)
    }
  }

  return (
    <div>
      <button onClick={() => setShowMusicUrl(!showMusicUrl)}>
        {' '}
        {/* New toggle button */}
        {showMusicUrl ? 'Hide Music URLs' : 'Show Music URLs'}
      </button>

      {showMusicUrl && ( // Conditional rendering
        <div className="container">
          {/* <h2>Music URLs</h2> */}
          <AddUrl onUrlAdded={() => setReloadUrls(true)} />
          {selectedUrl && (
            <EditUrl url={selectedUrl} onEdit={handleUpdate} />
          )}
          {urls.map((url) => (
            <div key={url.id}>
              <p>Name: {url.name}</p>
              <p>
                Url:{' '}
                <a href={url.url} target="_blank" rel="noopener noreferrer">
                  {url.url}
                </a>
              </p>
              <button onClick={() => handleDelete(url.id)}>Delete</button>
              <button onClick={() => handleEdit(url.id)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MusicUrl
