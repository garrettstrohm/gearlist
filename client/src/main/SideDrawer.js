import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TripList from '../messages/TripList'
import { useNavigate } from 'react-router-dom';


export default function SideDrawer({state, toggleDrawer}) {
  const navigate = useNavigate()
  return (
    <>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <List>
                <ListItem button onClick={() => navigate('/createtrip')}>
                  <ListItemText primary="Create a Trip" />
                </ListItem>
            </List>
            <TripList />
          </Drawer>
        </React.Fragment>
      ))}
      </>
  );
}
