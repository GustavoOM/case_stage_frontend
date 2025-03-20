import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const Navbar: React.FC = () => {
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button component={Link} to="/">
                    <Avatar
                        src="https://i.imgur.com/egyqT5v.png"
                        alt="Logo"
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                    />
                </Button>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Stage Consulting
                </Typography>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{
                        fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                        textTransform: 'none',
                    }}
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/areas"
                    sx={{
                        fontWeight: location.pathname === '/areas' ? 'bold' : 'normal',
                        textTransform: 'none',
                    }}
                >
                    Áreas
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/processes"
                    sx={{
                        fontWeight: location.pathname === '/processes' ? 'bold' : 'normal',
                        textTransform: 'none',
                    }}
                >
                    Processos
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;