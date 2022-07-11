import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import Dikjstra from './algorithm/dijkstra'
import CytographProps from '../props/cytograph_master_props'
import { useEffect, useState } from 'react'

export default function Algorithm(props: CytographProps) {
    const [edges, setEdges] = useState<Array<any>>([])
    useEffect(() => {
        setEdges([...props.edges])
    },[])
    return (
        <div className="cytograph-presets">
            <Box className="two_nodes" >
                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined button group"
                >
                    <Button variant="contained" className="button" sx={{marginBottom: '20px'}} onClick={() => props.setEdges(edges)}>Reset</Button>
                    <Button variant="contained" className="button" onClick={() => Dikjstra(props)}>Submit</Button>
                </ButtonGroup>
            </Box>
        </div>
    )
}