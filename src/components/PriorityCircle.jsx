import { useState } from "react"

const PriorityCircle = ({ priority }) => {
    let color = ''
    switch (priority) {
        case 'low': color = 'bg-green-500'; break;
        case 'medium': color = 'bg-yellow-500'; break;
        case 'high': color = 'bg-red-500'; break;
    }

    return (
        <div className={`${color} w-6 h-6 rounded-3xl`}></div>
    )
}

export default PriorityCircle