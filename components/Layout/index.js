import css from './styles.scss';

import Head from "next/head";

const Layout = props => (
  <main className={css.content}>
    <Head>
      <title>Clicker | Sandbox | Viklund.dev</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"></link>
      <link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"></link>
    </Head>
    {props.children}

    <style jsx global>{`
      window,html { width: 100%; height: 100%; box-sizing: border-box; }
      *,*::after,*::before { box-sizing: inherit; }
      body {
        position: relative;
        margin: 0;
        padding: 0;
        display: grid;
        height: 100vh;
        width: 100vw;
        grid-template-rows: 1fr auto 3fr;
        grid-template-columns: 1fr auto 1fr;
        grid-template-areas:
            "top top top"
            "left main right"
            "bottom bottom bottom";

        background: #121212;
        background-image: url(medieval-armor.jpg);
        background-position: center;
        background-size: cover;
        font-size: 16px;

        font-family: "Open Sans", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
      }

      div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, p, blockquote, th, td {
        margin: 0;
        padding: 0;
      }

      #__next {
        grid-area: main;
        width: 800px;
        height: 600px;
        box-shadow:         3px 3px 5px 6px #ccc;
        
      }

      h1 {
        font-weight: 700;
      }
      p {
        margin-bottom: 10px;
      }
    `}</style>
  </main>
);

export default Layout;
