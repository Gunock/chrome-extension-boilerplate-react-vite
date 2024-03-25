import './PopupHeader.css';

import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import {Toolbar} from '@mui/material';
import {ReactElement, ReactNode} from 'react';

export default function PopupHeader(props: {children?: ReactNode}): ReactElement {
    return (
        <Toolbar className='popup-header' sx={{boxShadow: 1}}>
            <ExtensionRoundedIcon className='popup-logo' />
            <h1>Chrome Extension React</h1>
            {props.children}
        </Toolbar>
    );
}
