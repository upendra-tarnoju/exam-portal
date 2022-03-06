import type { NextPage } from 'next'
import Head from "next/head";
import React from 'react';

import Navbar from '../components/navbar';

const Home: NextPage = ({children}) => {
  return (
    <React.Fragment>
      <Head>
        <title>Signup</title>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
    </React.Fragment>
  )
}

export default Home
