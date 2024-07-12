import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Avatar alt="CorreThor" src="/images/Avatar.png" />
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 80 }}>
          CorreThor
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
