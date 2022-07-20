import React from 'react'
import { utils } from './Utils'
import { useState } from 'react';
export default function Stars(props) {


    return (

        <div>
            {
                utils.range(1, props.stars).map((item) => {
                    return (

                        <div key={item} className="star" />
                    )
                })
            }
        </div>
    )




}
