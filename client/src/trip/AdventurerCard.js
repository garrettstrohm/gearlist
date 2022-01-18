import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AdventurerCard({adventurer, adventure, handleDeleteAdventurer}) {

  return (
    <Box sx={{ minWidth: 275, marginTop: '3px' }}>
            <Card variant="outlined">
            <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    {adventurer.first_name} {adventurer.last_name}
                </Typography>
                <Typography variant="body2">
                    {adventurer.email} | {adventurer.phone_number}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleDeleteAdventurer(adventure.id)}>Remove</Button>
            </CardActions>
        </React.Fragment>  
        </Card>
    </Box>
  );
}
