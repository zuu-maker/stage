import React, {useState} from 'react';
import search from "../../images/search.svg";

function Search(props) {
    const [loading, setLoading] = useState(false)

    return (
        <div>
            <div className='search float-right '>
                <form className="d-flex">
                    <input  className='' name="search" style={{backgroundImage: `url(${search})`}} type="text"
                           placeholder="Search"/>
                    <button className='ml-3' style={{background : loading ? '#ffffff':''}}  type="submit"><span className='form-btn'>Create Event</span></button>

                </form>
            </div>
        </div>
    );
}

export default Search;