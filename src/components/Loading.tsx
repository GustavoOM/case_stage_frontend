import React from 'react';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          width: '80px',
          height: '80px',
        }}
      >
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '33px',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              background: '#007bff',
              animation: 'loading-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
              animationDelay: `${index * 0.1}s`,
              transformOrigin: '40px 40px',
            }}
          ></div>
        ))}
      </div>
      <p style={{ marginTop: '60px', fontSize: '1.2rem', color: '#333' }}>Carregando...</p>

      <style>
        {`
          @keyframes loading-animation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;