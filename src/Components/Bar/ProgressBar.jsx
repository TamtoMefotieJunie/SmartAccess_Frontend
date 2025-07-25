import React from 'react';

const ProgressBar = ({ value,progress }) => {
    return (
        <div className="w-[60%] bg-gray-100 rounded-lg">
            <progress
                value={value}
                max="1"
                className="rounded-lg"
                style={{
                    width: '100%',
                    height: '20px',
                    color: 'transparent', 
                    backgroundColor: 'transparent',
                }}
            />
            <style jsx>{`
                progress {
                    appearance:none;
                }
                progress::-webkit-progress-bar {
                    background-color: white;
                    border-radius: 15px; 
                }
                progress::-webkit-progress-value {
                    background-color: ${progress};
                    border-radius: 15px; 
                }
               
            `}</style>
        </div>
    );
};

export default ProgressBar;