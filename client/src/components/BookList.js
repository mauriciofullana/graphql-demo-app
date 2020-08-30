import React from "react";
import { useQuery, gql } from "@apollo/client";

const BOOK_LIST = gql`
  {
    books {
      name
      genre
    }
  }
`;

const renderBook = ({name, genre}) => {
  return (
    <li key={name}>
      {`${name} (${genre})`}
    </li>
  )
}

export default () => {
  const { loading, error, data } = useQuery(BOOK_LIST);

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
