import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

{/* Card function took from MUI.com */}
function ImgMediaCard({discription,title, image}) {
    
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
        {/* to be linked later */}
        <Button size="small">Virtual Queue</Button> 
        <Button size="small">Ride Info</Button>
        <Button size="small">Reviews</Button>
      </CardActions>
    </Card>
  );
}
export default ImgMediaCard;
