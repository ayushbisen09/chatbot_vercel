import { useState } from 'react';

import Box from '@mui/material/Box';

import { Image } from 'src/components/image';
import ChatBox from 'src/components/chat-box/chat-box';
import { Carousel, useCarousel, CarouselDotButtons, CarouselArrowBasicButtons } from 'src/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselAlign({ data }) {
  const carousel = useCarousel({
    containScroll: false,
    slideSpacing: '20px',
  });
  const [chatBoxImage, setChatBoxImage] = useState('../../assets/images/chatImage/location.png'); // Initial image

  // Sample data to map over, this can be replaced with your actual data
  const chatData = [
    { id: 1, name: 'Ayush', product: 'Headway Bassheads', quantity: 2, orderId: '12345', address: '123 Street, City', deliveryDate: '2024-09-10' },
    { id: 2, name: 'Ankit', product: 'Headway Bassheads', quantity: 2, orderId: '67892', address: '456 Avenue, City', deliveryDate: '2024-09-11' },
    { id: 3, name: 'Nikhil', product: 'Headway Bassheads', quantity: 3, orderId: '67820', address: '456 Amar, City', deliveryDate: '2024-09-11' },
    { id: 4, name: 'Ankit', product: 'Headway Bassheads', quantity: 4, orderId: '67893', address: '456 Balaghat, City', deliveryDate: '2024-09-11' },
    { id: 5, name: 'Sarthak', product: 'Headway Bassheads', quantity: 5, orderId: '69890', address: '456 Bhopal, City', deliveryDate: '2024-09-11' },
    { id: 6, name: 'Rajendra', product: 'Headway Bassheads', quantity: 6, orderId: '67790', address: '456 Indore, City', deliveryDate: '2024-09-11' },
    // Add more objects as needed
  ];

  return (
    <>
      <Carousel carousel={carousel} sx={{ width: '335px' }}>
        {chatData.map((item, index) => (
          <Box key={item.id} sx={{ width: '335px' }}>
            <ChatBox
              coverSrc={chatBoxImage}
              showImage
              text={
                <>
                  <span style={{ fontWeight: '600' }}>{`Hi ${item.name}! 🎧🛒`}</span> <br /> <br />
                  `Congratulations! 🎉 Your order for the ${item.product} has been confirmed. 🙌`
                  <br /> <br />
                  `Order Details:`
                  <br />
                  {`Product: ${item.product}`}
                  <br />
                  {`Quantity: ${item.quantity}`}
                  <br />
                  {`Order ID: ${item.orderId}`}
                  <br />
                  {`Delivery Address: ${item.address}`}
                  <br />
                  {`Estimated Delivery Date: ${item.deliveryDate}`}
                </>
              }
              showLinks
              showVisit
            />
          </Box>
        ))}
      </Carousel>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />

        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />
      </Box>
    </>
  );
}

function CarouselItem({ item, index }) {
  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <IndexLabel index={index + 1} />
      <Image alt={item.title} src={item.coverUrl} ratio="4/3" />
    </Box>
  );
}
