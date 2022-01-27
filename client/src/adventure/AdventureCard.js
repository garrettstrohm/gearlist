import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom'


export default function AdventureCard({adventure, handleDelete}) {

  const navigate = useNavigate()

  function onDelete(e){
    e.stopPropagation();
    handleDelete(adventure.id)
}
 
  return (
    <Card sx={{ maxWidth: "100%", height: "350px", margin: "0px 0px 10px 0px" }} onClick={() => navigate(`/adventure/${adventure.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170px"
          image={adventure.trip.image}
          alt={`${adventure.trip.title} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" overflow="hidden">
            {adventure.trip.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{maxWidth: "100%", height:"75px"}} overflow="auto">
            {adventure.trip.description}
          </Typography>
        <Stack direction="row" justifyContent="center">
            <Button variant="text" sx={{marginBottom: '10px', color: "#5D6D7E" }} onClick={(e) => onDelete(e)}>Delete</Button>
        </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}