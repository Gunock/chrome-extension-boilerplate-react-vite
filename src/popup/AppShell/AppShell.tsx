import { ReactElement, ReactNode, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import './AppShell.css';

export default function AppShell(props: { children?: ReactNode }): ReactElement {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home-page');
    }, []);

    return <div className="App">{props.children}</div>;
}
