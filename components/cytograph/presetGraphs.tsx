import Box from '@mui/material/Box'
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
            { data: { source: '1', target: '4', label: 'A to D', weight: '7' } },
            { data: { source: '1', target: '6', label: 'A to F', weight: '5' } },

            { data: { source: '2', target: '4', label: 'B to D', weight: '6' } },
            { data: { source: '2', target: '5', label: 'B to E', weight: '3' } },
            { data: { source: '2', target: '7', label: 'B to G', weight: '8' } },

            { data: { source: '3', target: '6', label: 'C to F', weight: '6' } },

            { data: { source: '4', target: '6', label: 'D to F', weight: '1' } },
            { data: { source: '4', target: '7', label: 'D to G', weight: '6' } },

            { data: { source: '5', target: '7', label: 'E to G', weight: '7' } },
            { data: { source: '6', target: '7', label: 'F to G', weight: '6' } },
        ]
    },
    {
        node: [
            { data: { id: '1', label: 'A' }, position: { x: 325, y: 125 } },
            { data: { id: '2', label: 'B' }, position: { x: 475, y: 125 } },
            { data: { id: '3', label: 'C' }, position: { x: 600, y: 200 } },
            { data: { id: '4', label: 'D' }, position: { x: 325, y: 275 } },
            { data: { id: '5', label: 'E' }, position: { x: 475, y: 275 } },
        ],
        edges: [
            { data: { source: '1', target: '2', label: 'A to B', weight: '6' } },
            { data: { source: '1', target: '4', label: 'A to D', weight: '1' } },

            { data: { source: '2', target: '3', label: 'B to C', weight: '5' } },
            { data: { source: '2', target: '4', label: 'B to D', weight: '2' } },
            { data: { source: '2', target: '5', label: 'B to E', weight: '2' } },
            
            { data: { source: '3', target: '5', label: 'C to E', weight: '5' } },
            { data: { source: '4', target: '5', label: 'D to E', weight: '1' } },
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