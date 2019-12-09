import { useState, useEffect } from 'react';
import axios from 'axios';


export const NasaImagesApiHook = () => {

  const nasaImageDataToImageData = (data) => {
    // We have to make sure that the data object returned by the server has all the properties we need to access
    if (data && data.collection && data.collection.items) {
      // Iterating over the images array
      return data.collection.items
        .map((item, index) => {
          if (item.links) {
            // We need to find an object in the 'link' array of type 'preview
            const link = item.links.find(link => link.rel === 'preview');
            // If there is no link object, return null (and we will clean all the null entries in the next step)
            return (link) ? { id: index.toString(), uri: link.href } : null;
          } else {
            return null;
          }
        })
        .filter(item => item !== null) // Because (even that it shouldn't) some items after mapping may be null
    } else {
      return null;
    }
  }


  const [data, setData] = useState();
  const [query, setQuery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Only run this code when the query value is changed
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);
      setData(null);
      try {
        const result = await axios(`https://images-api.nasa.gov/search?q=${query}&media_type=image`);
        setData(nasaImageDataToImageData(result.data));
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const clear = () => {
    setData(null);
  }

  return [{ data, isLoading, error }, setQuery, clear];
}
