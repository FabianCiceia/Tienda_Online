import React from 'react'
import { useParams } from 'react-router-dom';

function adit() {

    const { id } = useParams(); 
    return (
        <div>
        {id}
        </div>
    )
}

export default adit
