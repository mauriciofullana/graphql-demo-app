import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from '../queries/queries'


const renderBook = ({id, name, genre}) => {
  return (
    <li key={id}>
      {`${name} (${genre})`}
    </li>
  )
}

export default () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    
  return (
    <div>
      <ul id="book-lis">
        {data.books.map((book) => (renderBook(book)))}
      </ul>
    </div>
  );
};
