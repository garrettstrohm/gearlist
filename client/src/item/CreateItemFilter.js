import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function CreateItemFilter({handleCategoryChange}){


    return (
        <Box  sx={{ 
            minWidth: 200,
            display: 'flex',
            justifyContent: 'flex-start',
            }}>
                
          <FormControl>
            <InputLabel sx={{minWidth:150}} style ={{color:"#5D6D7E"}} id="demo-simple-select-label">Category</InputLabel>
            <Select
              sx={{minWidth:150}}
              style ={{color:"#5D6D7E"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              defaultValue="tripItem"
              onChange={handleCategoryChange}
            >
              {/* <MenuItem value="Select A Category"><em>Select a category...</em></MenuItem> */}
              <MenuItem style ={{color:"#5D6D7E"}} value="tripItem">Trip Item</MenuItem>
              <MenuItem style ={{color:"#5D6D7E"}} value="userItem">Personal Item</MenuItem>
            </Select>
          </FormControl>
        </Box>
      );
    }

    


export default CreateItemFilter