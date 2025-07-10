import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Placeholder photos from our image search
  const placeholderPhotos = [
    {
      id: 'placeholder1',
      url: 'https://images.unsplash.com/photo-1653246676297-98517bec8a52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmbHV0ZXxlbnwwfHx8fDE3NTIxODU0Mjh8MA&ixlib=rb-4.1.0&q=85',
      description: 'Mystical flute melodies'
    },
    {
      id: 'placeholder2',
      url: 'https://images.unsplash.com/photo-1645772647876-76f184a402a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmbHV0ZXxlbnwwfHx8fDE3NTIxODU0Mjh8MA&ixlib=rb-4.1.0&q=85',
      description: 'Sacred bamboo flute'
    },
    {
      id: 'placeholder3',
      url: 'https://images.unsplash.com/photo-1578496005953-ddc6b93f4b17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxtZWRpdGF0aW9uJTIwbXVzaWN8ZW58MHx8fHwxNzUyMTg1NDM1fDA&ixlib=rb-4.1.0&q=85',
      description: 'Meditation serenity'
    },
    {
      id: 'placeholder4',
      url: 'https://images.unsplash.com/photo-1595387494697-6325093cc9b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxtZWRpdGF0aW9uJTIwbXVzaWN8ZW58MHx8fHwxNzUyMTg1NDM1fDA&ixlib=rb-4.1.0&q=85',
      description: 'Tibetan singing bowls'
    },
    {
      id: 'placeholder5',
      url: 'https://images.pexels.com/photos/15634100/pexels-photo-15634100.jpeg',
      description: 'Traditional musician'
    },
    {
      id: 'placeholder6',
      url: 'https://images.pexels.com/photos/4498195/pexels-photo-4498195.jpeg',
      description: 'Peaceful meditation'
    }
  ];

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/photos/gallery`);
      const fetchedPhotos = response.data.photos || [];
      
      // Combine with placeholder photos if we have fewer than 6
      const allPhotos = [...fetchedPhotos];
      const remainingSlots = 6 - fetchedPhotos.length;
      
      if (remainingSlots > 0) {
        allPhotos.push(...placeholderPhotos.slice(0, remainingSlots));
      }
      
      setPhotos(allPhotos);
    } catch (error) {
      console.log('Using placeholder photos');
      setPhotos(placeholderPhotos);
    }
  };

  const handlePhotoUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingIndex(index);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('section', 'gallery');
      formData.append('description', `Gallery photo ${index + 1}`);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/upload-photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        await fetchPhotos();
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Photo upload failed. Please try again.');
    } finally {
      setUploadingIndex(null);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="section-container">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-serif text-magical-moon text-center mb-12 text-shadow-magical">
          Gallery of Moments
        </h2>
        
        {/* Main carousel */}
        <div className="relative mb-12">
          <div className="glass-enhanced p-8 max-w-4xl mx-auto">
            <div className="relative aspect-video bg-magical-dark bg-opacity-50 rounded-2xl overflow-hidden">
              {photos.length > 0 && (
                <img
                  src={photos[currentImageIndex].url || photos[currentImageIndex].path}
                  alt={photos[currentImageIndex].description || 'Magical moment'}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-enhanced p-3 rounded-full hover:bg-magical-bronze hover:bg-opacity-20 transition-all duration-300"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-magical-moon">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-enhanced p-3 rounded-full hover:bg-magical-bronze hover:bg-opacity-20 transition-all duration-300"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-magical-moon">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
            
            {/* Image description */}
            <div className="text-center mt-4">
              <p className="text-magical-silver font-elegant">
                {photos[currentImageIndex]?.description || 'A magical moment'}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail grid with upload slots */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="photo-slot hover-float">
              {photos[index] ? (
                <img
                  src={photos[index].url || photos[index].path}
                  alt={photos[index].description || 'Magical moment'}
                  className="cursor-pointer"
                  onClick={() => setCurrentImageIndex(index)}
                />
              ) : (
                <div className="text-magical-bronze text-center p-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-2">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M19 21H5V3H13V9H19V21Z"/>
                  </svg>
                  <p className="text-sm font-elegant">Add Photo</p>
                </div>
              )}
              
              {/* Upload overlay */}
              <div className="upload-overlay">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, index)}
                    className="hidden"
                    disabled={uploadingIndex === index}
                  />
                  <div className="text-magical-moon text-center">
                    {uploadingIndex === index ? (
                      <div className="animate-spin w-8 h-8 border-2 border-magical-moon border-t-transparent rounded-full mx-auto"></div>
                    ) : (
                      <>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-2">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        </svg>
                        <p className="text-sm font-elegant">
                          {photos[index] ? 'Replace' : 'Upload'}
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-magical-bronze font-elegant">
            ✨ Click on any image to view it in the main gallery ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;