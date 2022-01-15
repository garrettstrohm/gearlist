import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function AdventureCard({adventure, handleDelete}) {

  return (
    <Card sx={{ maxWidth: "100%", maxHeight: "350px", margin: "0px 0px 10px 0px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={adventure.image}
          alt={`${adventure.title} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {adventure.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{maxWidth: "100%", maxHeight:"50px"}} overflow="auto">
            {adventure.description}
          </Typography>
        </CardContent>
        <Stack direction="row" spacing={20} justifyContent="center">
            <Button variant="text">View</Button>
            <Button variant="text">Edit</Button>
            <Button variant="text" onClick={() => handleDelete(adventure.id)}>Delete</Button>
        </Stack>
      </CardActionArea>
    </Card>
  );
}