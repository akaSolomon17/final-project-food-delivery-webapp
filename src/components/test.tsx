import React from 'react'
import { Slider } from '@nextui-org/react';

const TestComp = () => {

    return (
        <>
            <div className='max-w-xs h-[200px]'>
                <div className='flex justify-between'>
                    <p>Estimate time:</p>
                    <p>3:13</p>
                </div>
                <Slider
                    aria-label='delivery progress'
                    color="foreground"
                    size="sm"
                    step={10}
                    // hideThumb
                    marks={[
                        {
                            value: 10,
                            label: "Ordering",
                        },
                        {
                            value: 40,
                            label: "Preparing",
                        },
                        {
                            value: 70,
                            label: "Delivering",
                        },
                        {
                            value: 100,
                            label: "Completed",
                        },
                    ]}
                    defaultValue={20}
                />
            </div>
        </>
    )
}

export default TestComp