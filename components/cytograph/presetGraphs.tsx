import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { FormControl } from '@mui/material'
import Button from '@mui/material/Button'

interface Cytograph {
    setNodes: (value: any) => void
    setEdges: (value: any) => void
}

const array = [
    {
        node: [
            { data: { id: '1', label: 'A' }, position: { x: 350, y: 125 } },
            { data: { id: '2', label: 'B' }, position: { x: 450, y: 125 } },
            { data: { id: '3', label: 'C' }, position: { x: 300, y: 225 } },
            { data: { id: '4', label: 'D' }, position: { x: 400, y: 225 } },
            { data: { id: '5', label: 'E' }, position: { x: 500, y: 225 } },
            { data: { id: '6', label: 'F' }, position: { x: 350, y: 325 } },
            { data: { id: '7', label: 'G' }, position: { x: 450, y: 325 } }
        ],
        edges: [
            { data: { source: '1', target: '2', label: 'A to B', weight: '2' } },
            { data: { source: '1', target: '3', label: 'A to C', weight: '4' } },
            { data: { source: '4', target: '1', label: 'A to D', weight: '7' } },
            { data: { source: '1', target: '6', label: 'A to F', weight: '5' } },

            { data: { source: '2', target: '4', label: 'B to D', weight: '6' } },
            { data: { source: '2', target: '5', label: 'B to E', weight: '3' } },
            { data: { source: '2', target: '7', label: 'B to G', weight: '8' } },

            { data: { source: '3', target: '6', label: 'C to F', weight: '6' } },

            { data: { source: '4', target: '6', label: 'D to F', weight: '2' } },
            { data: { source: '4', target: '7', label: 'D to G', weight: '6' } },

            { data: { source: '5', target: '7', label: 'E to G', weight: '7' } },
            { data: { source: '6', target: '7', label: 'F to G', weight: '6' } },
        ]
    }
]

export default function Presets(props: Cytograph) {
    async function test () {
        props.setNodes(array[0].node)
        props.setEdges(array[0].edges)
    }
    return (
        <div className="cytograph-presets">
            <Box className="two_nodes" >
                <Button variant="contained" className="button" onClick={() => {test()}}> Submit</Button>
            </Box>
        </div>
    )
}