import Container from '@mui/material/Container';
import AdventureCard from './AdventureCard';
import {useSelector, useDispatch} from 'react-redux'
import { setAllAdventures } from './adventureSlice';
import List from '@mui/material/List';


export default function AdventureCardContainer() {
    const dispatch = useDispatch()
    const adventures = useSelector(state => state.adventures.adventures)
    const adventureCardList = adventures?.map(adventure => <AdventureCard key={adventure.id} adventure={adventure} handleDelete={handleDelete}/>)

    function handleDelete(id){
        fetch(`/user_trips/${id}`, {method: "DELETE"})
        .then(() => {
            const newAdventures = adventures.filter(adventure => adventure.id !== id)
            dispatch(setAllAdventures([...newAdventures]))
        })
    }

    return (
        <>
            <h2 style={{textAlign: "center"}}>Your Adventures!</h2>
            <List sx={{maxHeight: "100vh", overflow: 'auto'}}>
                    {adventureCardList}
            </List>
        </>
    )
}
