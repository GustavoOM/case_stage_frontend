import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Home from './pages/Home';
import Areas from './pages/Areas';
import Processes from './pages/Process';
import ProcessDetailPage from './pages/ProcessDetailPage';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/areas" element={<Areas />} />
                    <Route path="/processes" element={<Processes />} />
                    <Route path="/process-details/:id" element={<ProcessDetailPage />} /> 
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
