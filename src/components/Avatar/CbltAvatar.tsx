import React, { useMemo } from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

export const stringToColor = (userName: string) => {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise -- colors generator */
  for (i = 0; i < userName.length; i += 1) {
    hash = userName.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise -- colors generator */
  return color;
};

export type AvatarProps = {
  name: string;
  size?: number;
};

const CBLTAvatar = ({ name, size = 35 }: AvatarProps) => {
  const firstChar = useMemo(() => name.charAt(0).toUpperCase(), [name]);

  return (
    <MuiAvatar
      sx={{
        bgcolor: stringToColor(name),
        width: size,
        height: size,
        fontSize: `${size / 2.5}px`,
        fontWeight: 700,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        position: 'relative',
      }}
    >
      {firstChar}
    </MuiAvatar>
  );
};

export default CBLTAvatar;
