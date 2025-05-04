import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useHasTicket } from './HasTicket';
import { useHasQueue } from './QueueCheck';

{/* Card function took from MUI.com */}
function ImgMediaCard({ title, image }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const hasTicket = useHasTicket();
  const { inQueue, gameName } = useHasQueue();

  return (
    <Card
      sx={{
        width: { xs: 130, sm: 150, md: 180 },
        height: { xs: 200, sm: 220, md: 240 },
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        boxShadow: 3,
        margin: 'auto',
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: '30%',         // dynamic based on Card height
          width: '100%',
          objectFit: 'cover',
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
          background: 'rgba(24, 24, 27, 0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
        }}
      />
      <CardContent>
        <Typography variant="subtitle2"
          align="center"
          fontWeight="bold"
          sx={{ fontSize: '0.65rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{height: 'auto',justifyContent: 'center',flexWrap: 'wrap', gap: 0.5, px: 1, pb: 1 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: '0.55rem',     // smaller readable size
            padding: '2px 4px',      // tight padding
            borderRadius: 1,
            color: 'white',
            minWidth: 'auto',        // removes default large width
          }}
          onClick={() => {
            if (!token) return navigate('/login');
            if (!hasTicket) return toast.info('You have to buy a ticket!');
            if (inQueue && gameName !== title)
              return toast.error(`You are already in the queue for "${gameName}"`);
            navigate('/queue', { state: { gameT: { title }, image } });
          }}
        >
          Virtual Queue
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: '0.55rem',     // smaller readable size
            padding: '2px 4px',      // tight padding
            borderRadius: 1,
            color: 'white',
            minWidth: 'auto',        // removes default large width
          }}
          onClick={() => {
            switch (image) {
              case '/pictures/forgotten.png': navigate('/forgotten-info'); break;
              case '/pictures/tampet.png': navigate('/tampet-info'); break;
              case '/pictures/inferno.png': navigate('/inferno-info'); break;
              case '/pictures/cryzone.png': navigate('/cryzone-info'); break;
              case '/pictures/pharoah.png': navigate('/pharoah-info'); break;
              default: navigate('/info');
            }
          }}
        >
          Ride Info
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: '0.55rem',     // smaller readable size
            padding: '2px 4px',      // tight padding
            borderRadius: 1,
            color: 'white',
            minWidth: 'auto',        // removes default large width
          }}
          onClick={() => {
            switch (image) {
              case '/pictures/forgotten.png': navigate('/forgotten-reviews'); break;
              case '/pictures/tampet.png': navigate('/tampet-reviews'); break;
              case '/pictures/inferno.png': navigate('/inferno-reviews'); break;
              case '/pictures/cryzone.png': navigate('/cryzone-reviews'); break;
              case '/pictures/pharoah.png': navigate('/pharoah-reviews'); break;
              default: navigate('/inferno-reviews');
            }
          }}
        >
          Reviews
        </Button>
      </CardActions>
    </Card>
  );
}
export default ImgMediaCard;
