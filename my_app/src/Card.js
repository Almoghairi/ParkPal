import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

{/* Card function took from MUI.com */}
function ImgMediaCard({title, image}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check login
  return (
    <Card sx={{ maxWidth: 345 }} style={{backgroundColor:'light'}}>
      <CardMedia style={{
  background: 'rgba(24, 24, 27, 0.55)',           // slightly warmer black
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(12px)', // for Safari
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  color: '#eee'
}}
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
          
        </Typography>
      </CardContent>
      <CardActions>
        {/* linked  now */}
        <Button size="small" onClick={() => {
            if (token){
                navigate('/queue',{ state: { gameT:title , image:image}});
              }
            else {
                navigate('/login');
            }
          }}>Virtual Queue</Button> 
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
