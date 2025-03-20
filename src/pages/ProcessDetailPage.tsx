import React from 'react';
import Navbar from '../components/Navbar';
import ProcessDetail from '../components/ProcessDetail';

const ProcessDetailPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <ProcessDetail />
        </div>
    );
};

export default ProcessDetailPage;