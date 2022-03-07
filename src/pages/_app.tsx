import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { useApollo } from 'lib/apolloClient';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  let pageProps = {};

  if (ctx.Component.getInitialProps) {
    pageProps = await ctx.Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;
