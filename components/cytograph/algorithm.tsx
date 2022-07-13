import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import Dikjstra from './algorithm/dijkstra'
import Prim from './algorithm/prim'
import CytographProps from '../props/cytograph_master_props'
import { useEffect, useState } from 'react'

export default function Algorithm(props: CytographProps) {
    const [edges, setEdges] = useState<Array<any>>([])
    useEffect(() => {
        setEdges([...props.edges])
    },[])
    return (
        <div className="cytograph-algo">
            <Box className="two_nodes">
                <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                    <Button variant="contained" className="reset-button" onClick={() => props.setEdges(edges)}>Reset</Button>
                    <Button variant="contained" className="button" onClick={() => Dikjstra(props)}>Apply Dikjstra's Algorithm</Button>
                    <Button variant="contained" className="button" onClick={() => Prim(props)}>Apply Prim's Algorithm</Button>
                </ButtonGroup>
            </Box>
        </div>
    )
}