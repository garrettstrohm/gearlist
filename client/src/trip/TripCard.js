import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


export default function TripCard({trip, handleDelete}) {
    const navigate = useNavigate()

    function onDelete(e){
        e.stopPropagation();
        handleDelete(trip.id)
    }
  return (
        <Card sx={{ maxWidth: "100%", maxHeight: "350px", margin: "0px 0px 10px 0px" }} onClick={() => navigate(`/mytrip/${trip.id}`)}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="160"
                image={trip.image}
                alt={`${trip.title} image`}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {trip.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{maxWidth: "100%", maxHeight:"50px"}} overflow="auto">
                    {trip.description}
                </Typography>
                </CardContent>
                <Stack direction="row" spacing={20} justifyContent="center">
                    <Button variant="text">Edit</Button>
                    <Button variant="text" onClick={(e) => onDelete(e)}>Delete</Button>
                </Stack>
            </CardActionArea>
        </Card>
  );
}