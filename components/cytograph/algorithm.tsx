import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import Dikjstra from './algorithm/dijkstra'
import Prim from './algorithm/prim'
import CytographProps from './props/cytograph_master_props'
import { useEffect, useState } from 'react'

export default function Algorithm(props: CytographProps) {
    const [edges, setEdges] = useState<Array<any>>([])//store passed props into a usestate, so when you modify the passed props I can reset it to original state
    useEffect(() => {
        setEdges([...props.edges])
    },[])
    return (
        <div className="cytograph-algo">
            <Box className="two_nodes">
                <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                    <Button variant="contained" className="reset-button" onClick={() => {
                        //This button allows the visualization of edge placement from algorithm
                        const currentEdges = props.edges//stores current edges
                        props.setEdges([])
                        currentEdges.forEach((item, index) => {//every second place an edge in array to display untill all edges are placed
                            setTimeout(function () {
                              props.setEdges((prevItems: any) => [...prevItems, item])
                            }, 1000 * index);
                        })
                    }}>Step by Step Demo</Button>
                    <Button variant="contained" className="reset-button" onClick={() => props.setEdges(edges)}>Reset</Button>
                    <Button variant="contained" className="dijkstra" onClick={() => Dikjstra(props)}>Apply Dikjstra's Algorithm</Button>
                    <Button variant="contained" className="prim" onClick={() => Prim(props)}>Apply Prim's Algorithm</Button>
                </ButtonGroup>
            </Box>
        </div>
    )
}