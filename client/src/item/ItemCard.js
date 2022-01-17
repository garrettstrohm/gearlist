import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function ItemCard({item}) {

    console.log("item:", item)
    return (
        <div>
            <Box sx={{ minWidth: 275, marginTop: '3px' }}>
            <Card variant="outlined">
            <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    {item.item.name}
                </Typography>
                <Typography variant="body2">
                    Quantity: {item.quantity}
                </Typography>
                Acquired: <Checkbox label="Acquired"/>
            </CardContent>
            <CardActions>
                <Button size="small" >Remove</Button>
            </CardActions>
        </React.Fragment>  
        </Card>
    </Box>
        </div>
    )
}

export default ItemCard
