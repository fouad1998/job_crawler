import { IconButton as Button, IconButtonProps } from '@mui/material';

function IconButton(props: IconButtonProps) {
  return (
    <Button
      size="small"
      {...props}
      sx={{
        background: '#e6e9ed',
        color: '#696a6c',
        ':hover': {
          background: '#cacdd1',
        },
        '&.Mui-disabled': {
          background: '#e6e9ed',
        },
        ...(props.sx || {}),
      }}
    />
  );
}

export default IconButton;
