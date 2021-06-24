import React, {useState} from 'react';
import search from "../../images/search.svg";
import {useLoader} from "../../contexts/loaderContext";
import {auth, db} from "../../firebase/firebase";
import {useEvent} from "../../contexts/eventsContext";
import '../events/events.css'
import Card from "../events/card";
import SearchItem from "./searchItem";

function Search(props) {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState([])
    const {setLoader} = useLoader();
    const {eventsList,setEventsList} = useEvent()
    


   async function handleSearch(e){
        let searchList = [];
        var strSearch = e.target.value;
        var strlength = strSearch.length;
        var strFrontCode = strSearch.slice(0, strlength-1);
        var strEndCode = strSearch.slice(strlength-1, strSearch.length);

        var startcode = strSearch;
        var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        setLoader(true)
        console.log(startcode,endcode)
        await db.collection('Events')
            .where('EventName', '>=', startcode)
            .where('EventName', '<', endcode).get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    const data = doc.data()
                    searchList.push(data)



                })
            })
        setEventsList(searchList);
        setSearch(searchList);
        // console.log(eventsList)
        console.log(search)


        setLoader(false)

    }

    return (
            <div className='position-relative search-input'>
                <form className="d-flex">
                    <input  onChange={handleSearch} className='' name="search" style={{backgroundImage: `url(${search})`}} type="text"
                           placeholder="Search"/>

                </form>
                <div className='search-dropdown'>
                    { search ? search?.map(event  =>{
                        return(
                            <>
                        <SearchItem  event={event}/>
                            </>
                        )
                    }) : 'p'}

                </div>

        </div>
    );
}

export default Search;
