import { useEffect, useRef, useState } from 'react';

import Layout from "../components/Layout";
import Arena from '../components/Arena';
import Character from '../components/Character';
import Profile from '../components/Profile';

const Index = () => {
  return (
    <Layout>
      <Profile />
      <Character />
      <Arena />
    </Layout>
  )
};

export default Index;
