import React from 'react';

export default function Instructions({ instructions }) {

    return (
        <div className={'flex flex-col justify-start items-start mt-10'}>
            {
                instructions.map((instruction, index) => (
                    <div key={index} className={'mb-8'}>
                        <h3 className={'text-start mb-4'}>Étape - {index + 1}</h3>
                        <p className={'text-start'}>{instruction}</p>
                    </div>
                ))

            }
        </div>
    );
}
