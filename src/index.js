// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, split } from '@apollo/client';
// // import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { WebSocketLink} from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';

// // Create an HTTP link for queries and mutations
// const httpLink = new HttpLink({
//   uri:'http://localhost:4000/graphql',
//   Credential: 'include', // Include credential if needed 
// }); 
// //http => hypertext transfer protocol

// // Create a WebSocket link for subscriptions
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options:{
//     reconnect: true,
//   }
// });
// // ws => websocket protocol

// // Split links: route queries and mutations to HTTP link and subscriptions to WebSocket link

// const splitLink = split(
//   ({query}) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' && 
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink
// );

// // Initialize Apollo Client with the split link and Cache
// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// })

// // const link = new WebSocketLink({
// //   uri: `ws://localhost:4000`,
// //   options:{
// //     reconnect: true
// //   }
// // })

// // const client = new ApolloClient({
// //   wsLink,
// //   uri:"http://localhost:4000",
// //   cache: new InMemoryCache(),
  
// // });

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient} from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Create an HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

// Create a WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(createClient({
  uri: `ws://localhost:4000/graphql`,
  // options: {
    // reconnect: true,
  // },
}));

// Split links: route queries and mutations to HTTP link, and subscriptions to WebSocket link
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Initialize Apollo Client with the split link and cache
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);


