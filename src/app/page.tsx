import HomeClient from '@/app/components/HomeClient';
import Head from 'next/head';

export const Home = () => {

  const meta = {
    title: 'Joona Ansamaa - trapland.fi',
    description:
      'Joona Ansamaa - Software Engineer - trapland.fi',
    type: 'website',
    url: 'https://trapland.fi',
    name: 'trapland.fi',
  };

   return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta content={meta.description} name='description' />
        <meta property='og:url' content={meta.url} />
        <link rel='canonical' href={meta.url} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content={meta.name} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
      </Head>

      <HomeClient />
    </>
  );
}

export default Home;