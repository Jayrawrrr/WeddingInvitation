import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaHeart, FaCamera, FaPlay, FaExpand, FaDownload, FaRing } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gallery images from the Ate folder
  const imageFiles = [
    'IMG_4747.HEIC', 'IMG_4741.HEIC', 'IMG_4739.HEIC', 'IMG_4736.HEIC',
    'IMG_4720.HEIC', 'IMG_4719.HEIC', 'IMG_4717.HEIC', 'IMG_4716.HEIC',
    'IMG_4715.HEIC', 'IMG_4714.HEIC', 'IMG_4703.HEIC', 'IMG_4701.HEIC',
    'IMG_4699.HEIC', 'IMG_4694.JPG', 'IMG_4684.heic', 'IMG_4680.HEIC',
    'IMG_4676.HEIC', 'IMG_4674.JPG', 'IMG_4672.HEIC', 'IMG_4670.HEIC',
    'IMG_4549.HEIC', 'IMG_4548.HEIC', 'IMG_4547.HEIC', 'IMG_4542.HEIC',
    'IMG_4541.HEIC', 'IMG_4535.HEIC', 'IMG_4531.HEIC'
  ];

  const galleryImages = imageFiles.map((filename, index) => {
    // Convert HEIC to lowercase for consistency
    const normalizedFilename = filename.toLowerCase().endsWith('.heic') 
      ? filename.replace(/\.heic$/i, '.jpg') 
      : filename;
    
    return {
      id: index + 1,
      src: `/Ate/${normalizedFilename}`,
      alt: `Memory ${index + 1}`,
      category: 'memories'
    };
  });

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  return (
    <section className="gallery-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">Our precious moments</p>
        </motion.div>

        {/* Mosaic Gallery Layout */}
        <motion.div 
          className="gallery-mosaic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Single scattered stack of all photos */}
          <motion.div
            className="gallery-stack"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            {galleryImages.map((image, imgIndex) => (
              <motion.div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(image, imgIndex)}
                whileHover={{ zIndex: 100 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: imgIndex * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="image-container">
                  <img src={image.src} alt={image.alt} />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <FaCamera className="overlay-icon" />
                      <span className="overlay-text">{image.alt}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Love Quote Section */}
        <motion.div 
          className="love-quote"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="quote-container">
            <div className="quote-icon">
              <FaHeart />
            </div>
            <blockquote>
              "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
            </blockquote>
            <cite>— Maya Angelou</cite>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>
                <FaTimes />
              </button>
              <button 
                className="lightbox-nav lightbox-prev" 
                onClick={goToPrevious}
                disabled={currentIndex === 0}
              >
                <FaChevronLeft />
              </button>
              <button 
                className="lightbox-nav lightbox-next" 
                onClick={goToNext}
                disabled={currentIndex === galleryImages.length - 1}
              >
                <FaChevronRight />
              </button>
              <div className="lightbox-image-container">
                <img src={selectedImage.src} alt={selectedImage.alt} />
              </div>
              <div className="lightbox-info">
                <h3>{selectedImage.alt}</h3>
                <p>{currentIndex + 1} of {galleryImages.length}</p>
                <div className="lightbox-actions">
                  <button className="action-btn">
                    <FaDownload />
                  </button>
                  <button className="action-btn">
                    <FaPlay />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;