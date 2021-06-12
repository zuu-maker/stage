import React, {useState} from 'react';
import search from "../../images/search.svg";

function Search(props) {
    const [loading, setLoading] = useState(false)

    return (
        <div>
            <div className=' '>
                <form className="d-flex">
                    <input  className='' name="search" style={{backgroundImage: `url(${search})`}} type="text"
                           placeholder="Search"/>

                </form>
            </div>
        </div>
    );
}

export default Search;
