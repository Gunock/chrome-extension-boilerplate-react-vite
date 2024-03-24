import './PopupContent.css';

import Box from '@mui/material/Box';
import {ReactElement, ReactNode} from 'react';

export default function PopupContent(props: {children?: ReactNode}): ReactElement {
  return (
    <Box className='popup-content' display='flex' justifyContent='center' alignItems='center'>
      {props.children}
    </Box>
  );
}
