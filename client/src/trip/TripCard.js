import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function TripCard({trip, handleDelete}) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={trip.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {trip.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="text">View</Button>
            <Button variant="text">Edit</Button>
            <Button variant="text" onClick={() => handleDelete(trip.id)}>Delete</Button>
        </Stack>
      </CardActionArea>
    </Card>
  );
}