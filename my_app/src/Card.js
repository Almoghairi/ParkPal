import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

{/* Card function took from MUI.com */}
function ImgMediaCard({discription,title, image}) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {discription}
        </Typography>
      </CardContent>
      <CardActions>
        {/* linked  now */}
        <Button size="small" onClick={() => navigate('/queue',{ state: { gameT:title , image:image}} )}>Virtual Queue</Button> 
        <Button size="small" onClick={() => {
            switch (image) {
              case '/pictures/forgotten.png':
                navigate('/forgotten-info');
                break;
              case '/pictures/tampet.png':
                navigate('/tampet-info');
                break;
              case '/pictures/inferno.png':
                navigate('/inferno-info');
                break;
              case '/pictures/cryzone.png':
                navigate('/cryzone-info');
                break;
              case '/pictures/pharoah.png':
                navigate('/pharoah-info');
                break;
              default:
                navigate('/info'); 
            }
        }}>Ride Info</Button>
        <Button size="small" onClick={() =>{
          switch (image) {
            case '/pictures/forgotten.png':
              navigate('/forgotten-reviews');
              break;
            case '/pictures/tampet.png':
              navigate('/tampet-reviews');
              break;
            case '/pictures/inferno.png':
              navigate('/inferno-reviews');
              break;
            case '/pictures/cryzone.png':
              navigate('/cryzone-reviews');
              break;
            case '/pictures/pharoah.png':
              navigate('/pharoah-reviews');
              break;
            default:
              navigate('/inferno-reviews'); 
          }
          
        }}>Reviews</Button>
      </CardActions>
    </Card>
  );
}
export default ImgMediaCard;
