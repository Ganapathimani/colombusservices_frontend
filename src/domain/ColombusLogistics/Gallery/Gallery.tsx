import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faWarehouse,
  faPlane,
  faBox,
  faChevronLeft,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: 'vehicles' | 'warehouse' | 'operations';
  description: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop',
      title: 'Heavy Duty Freight Trucks',
      category: 'vehicles',
      description:
        'Our fleet of modern trucks handles long-distance transportation with GPS tracking and fuel efficiency',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      title: 'Last Mile Delivery Vans',
      category: 'vehicles',
      description:
        'Specialized delivery vehicles optimized for urban logistics and customer satisfaction',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
      title: 'Container Cargo Ships',
      category: 'vehicles',
      description:
        'International shipping vessels for global freight transportation across oceans',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
      title: 'Air Cargo Fleet',
      category: 'vehicles',
      description:
        'High-speed air freight for time-critical and high-value shipments worldwide',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop',
      title: 'Modern Distribution Center',
      category: 'warehouse',
      description:
        'State-of-the-art 500,000 sq ft facility with climate control and security systems',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      title: 'Automated Storage System',
      category: 'warehouse',
      description:
        'Robotic inventory management with AI-powered sorting and retrieval systems',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop',
      title: 'Loading Dock Operations',
      category: 'warehouse',
      description:
        'Multiple dock doors with hydraulic levelers for efficient loading and unloading',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
      title: 'Cold Storage Facility',
      category: 'warehouse',
      description:
        'Temperature-controlled storage for pharmaceutical and perishable goods',
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&h=600&fit=crop',
      title: 'Package Sorting Hub',
      category: 'operations',
      description:
        'High-speed automated sorting with capacity for 50,000 packages per hour',
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&h=600&fit=crop',
      title: 'Quality Control Center',
      category: 'operations',
      description:
        'Comprehensive inspection and quality assurance for all shipments',
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=600&fit=crop',
      title: 'Cross-Dock Operations',
      category: 'operations',
      description:
        'Efficient transfer operations minimizing storage time and maximizing speed',
    },
  ];

  const categories = [
    {
      label: 'All', value: 'all', icon: faBox, color: '#6b7280',
    },
    {
      label: 'Vehicles', value: 'vehicles', icon: faTruck, color: '#3b82f6',
    },
    {
      label: 'Warehouses', value: 'warehouse', icon: faWarehouse, color: '#f97316',
    },
    {
      label: 'Operations', value: 'operations', icon: faPlane, color: '#22c55e',
    },
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleCloseModal = () => setSelectedImage(null);

  const handlePrevImage = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNextImage = () => {
    const nextIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <Box maxWidth="lg" mx="auto" px={{ xs: 2, md: 4 }} py={{ xs: 4, md: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Logistics Gallery
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          maxWidth="md"
          mx="auto"
        >
          Explore our comprehensive logistics infrastructure - from state-of-the-art
          vehicles and warehouses to cutting-edge technology and operations
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        justifyContent="center"
        sx={{ mb: 6, gap: 2 }}
      >
        {categories.map((category) => (
          <Button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            variant={selectedCategory === category.value ? 'contained' : 'outlined'}
            sx={{
              borderRadius: '50px',
              textTransform: 'none',
              px: 3,
              py: 1,
              mx: 1,
              my: 0.5,
              fontWeight: 600,
              bgcolor: selectedCategory === category.value ? category.color : 'white',
              color: selectedCategory === category.value ? 'white' : 'text.primary',
              '&:hover': {
                bgcolor: selectedCategory === category.value ? category.color : 'grey.100',
              },
            }}
            startIcon={<FontAwesomeIcon icon={category.icon} />}
          >
            {category.label}
          </Button>
        ))}
      </Stack>

      <Stack
        direction="row"
        spacing={{ xs: 2, md: 3 }}
        flexWrap="wrap"
        alignItems="stretch"
        sx={{ mb: 4 }}
      >
        {filteredImages.map((image, index) => (
          <Box
            key={image.id}
            sx={{
              width: {
                xs: '100%',
                sm: '50%',
                md: '33.3333%',
                lg: '25%',
              },
              p: 1,
            }}
          >
            <Card
              onClick={() => handleImageClick(image, index)}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.25s, box-shadow 0.25s',
                '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
              }}
              elevation={2}
            >
              <Box position="relative">
                <CardMedia
                  component="img"
                  height="180"
                  image={image.src}
                  alt={image.title}
                  sx={{
                    transition: 'transform 0.3s',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Chip
                  label={image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    bgcolor: categories.find((c) => c.value === image.category)?.color,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {image.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {image.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>

      <Dialog
        open={!!selectedImage}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        aria-labelledby="gallery-dialog"
      >
        <DialogContent sx={{ position: 'relative', p: 0, bgcolor: 'black' }}>
          <IconButton
            onClick={handleCloseModal}
            aria-label="close"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>

          <IconButton
            onClick={handlePrevImage}
            aria-label="previous image"
            sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>

          <IconButton
            onClick={handleNextImage}
            aria-label="next image"
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </IconButton>

          {selectedImage && (
            <Box sx={{ bgcolor: 'white', borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ textAlign: 'center', bgcolor: 'black' }}>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  style={{
                    maxHeight: '70vh',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box p={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedImage.title}
                  </Typography>
                  <Chip
                    label={
                      selectedImage.category.charAt(0).toUpperCase()
                      + selectedImage.category.slice(1)
                    }
                    sx={{
                      bgcolor:
                        categories.find((c) => c.value === selectedImage.category)?.color,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>

                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedImage.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Image
                  {' '}
                  {currentImageIndex + 1}
                  {' '}
                  of
                  {' '}
                  {filteredImages.length}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;
