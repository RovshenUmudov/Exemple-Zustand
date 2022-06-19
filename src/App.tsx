import React from 'react';
import useStore from "./store/store";
import {Item} from "./store/store";

import './App.css'

const App = () => {

    const {items, fetchItem, removeItem, loading} = useStore(state => state)

    return (
        <div>
            <div className={`button-wrap ${loading ? 'loading' : ''}`}>
                <button onClick={fetchItem}>Load Item</button>
            </div>

            <div className="images">
                {
                    items.map((el: Item) => (
                        <div className={"item"} key={el.id} data-id={el.id}>
                            <img src={el.url} alt={el.title}/>
                            <button onClick={() => removeItem(el.id)}>Remove</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default App;
