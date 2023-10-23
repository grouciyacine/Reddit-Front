import React from 'react';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {createUploadLink } from 'apollo-upload-client'
import { useSelector } from 'react-redux';
const ApolloProviders = () => {
  const user=useSelector((state:any)=>state.user)
  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/',
  });
  const uploadLink = createUploadLink({
    uri: 'https://reddit-backend-git-main-grouciyacine.vercel.app/',
  });

  const authLink = setContext((_, { headers }) => {
    //const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        ...headers,
        Authorization: user ? `Bearer ${user?.token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default ApolloProviders;
