import Container from '@mui/material/Container';
import AdventureCard from './AdventureCard';
import {useSelector, useDispatch} from 'react-redux'
import { setAllAdventures } from './adventureSlice';
import List from '@mui/material/List';
import SearchBar from '../main/SearchBar';
import {useState} from 'react'
import Button from '@mui/material/Button'


export default function AdventureCardContainer() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [toggleSearch, setToggleSearch] = useState(false)
    const adventures = useSelector(state => state.adventures.adventures)
    const adventuresToDisplay = adventures.filter(adventure => adventure.trip.title.toLowerCase().includes(search.toLowerCase()))
    const adventureCardList = adventuresToDisplay?.map(adventure => <AdventureCard key={adventure.id} adventure={adventure} handleDelete={handleDelete}/>)

    function handleDelete(id){
        fetch(`/user_trips/delete/${id}`, {method: "DELETE"})
        .then(() => {
            const newAdventures = adventures.filter(adventure => adventure.id !== id)
            dispatch(setAllAdventures([...newAdventures]))
        })
    }

    return (
        <>
            <h2 style={{textAlign: "center", color: "#5D6D7E"}}>Your Adventures!</h2>
            <Button onClick={() => setToggleSearch(toggleSearch => !toggleSearch)} sx={{color: '#FF9B00'}}>Search Adventures</Button>
            {toggleSearch ? <SearchBar search={search} setSearch={setSearch}/> : null}
            <List sx={{maxHeight: "80vh", overflow: 'auto'}}>
                    {adventureCardList}
            </List>
        </>
    )
}
