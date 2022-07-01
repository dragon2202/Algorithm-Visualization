import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Dikjstra from './algorithm/dijkstra'
import CytographProps from '../props/cytograph_props'

export default function Presets(props: CytographProps) {
    return (
        <div className="cytograph-presets">
            <Box className="two_nodes" >
                <Button variant="contained" className="button" onClick={() => Dikjstra(props)}>Submit</Button>
            </Box>
        </div>
    )
}