import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Link} from 'react-router-dom'
import TripList from '../messages/TripList'
import { useNavigate } from 'react-router-dom';


export default function SideDrawer({state, setState, toggleDrawer}) {
  const navigate = useNavigate()
  return (
    <>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
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
