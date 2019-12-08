import { useState, useEffect } from 'react';
import axios from 'axios';


export const NasaImagesApiHook = () => {

  const nasaImageDataToImageData = (data) => {
    // We have to make sure that the dat object returned by the server has all the properties we need to access
    if (data && data.collection && data.collection.items) {
      // Iterating over the images array
      return data.collection.items
        .map((item, index) => {
          if (item.links) {
            // We need to find an object in the 'link' array of type 'preview
            const link = item.links.find(link => link.rel === 'preview');
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


  const [data, setData] = useState({});
  const [query, setQuery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      setData({});
      try {
        const result = await axios(`https://images-api.nasa.gov/search?q=${query}&media_type=image`);
        setData({ images: nasaImageDataToImageData(result.data) });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return [{ data, isLoading, isError }, setQuery];
}
