import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function Index() {
    const signed = useSelector(state => state.auth.signed);

    const Routes = createRouter(signed);

    return <Routes  />;
}