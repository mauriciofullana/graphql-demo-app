import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK_MUTATION } from '../queries/queries';


const renderAuthors = ({ loading, error, data }) => {
    if (error) {
        alert("Error while getting authors...");
        return;
    }

    if (loading) {
        return (<option disabled>Loading authors...</option>)
    } else {
        return data.authors.map((author) => {
            return <option key={author.id} value={author.id}>{author.name}</option>
        });
    }
}

export default () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    
    const getAuthorsResult = useQuery(GET_AUTHORS);
    const [addBook, { addBookMutationData }] = useMutation(ADD_BOOK_MUTATION);

    const onSubmitForm = (e) => {
        e.preventDefault();
        addBook({variables: {name, genre, authorId}});
    }

    return <form id="add-book" onSubmit={onSubmitForm}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={(e) => setGenre(e.target.value)}/>
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={(e) => setAuthorId(e.target.value)} >
                <option>Select author</option>
                {renderAuthors(getAuthorsResult)}
            </select>
        </div>

        <button>+</button>
    </form>
}

