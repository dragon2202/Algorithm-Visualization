import { useState } from 'react'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

import CytographMasterProps from '../props/cytograph_master_props'
import Presets from './presetGraphs'
import Algorithm from './algorithm'
import CytographEditAdd from './edit/add'
import CytographEditUpdate from './edit/update'
import CytographEditDelete from './edit/delete'

interface EditRenderProps {
    graphState: string,
    CytographProps: CytographMasterProps
}

const EditRender = (props : EditRenderProps) => {
    if (props.graphState === "preset") {
        return <Presets setNodes={props.CytographProps.setNodes} setEdges={props.CytographProps.setEdges}/>
    } 
    if (props.graphState === "algo") {
        return <Algorithm nodes={props.CytographProps.nodes} edges={props.CytographProps.edges} distance={props.CytographProps.distance} previous={props.CytographProps.previous} setNodes={props.CytographProps.setNodes} setEdges={props.CytographProps.setEdges} setDistance={props.CytographProps.setDistance} setPrevious={props.CytographProps.setPrevious}/>
    } 
    if (props.graphState === "add") {
        return <CytographEditAdd nodes={props.CytographProps.nodes} edges={props.CytographProps.edges} setNodes={props.CytographProps.setNodes} setEdges={props.CytographProps.setEdges}/>
    } 
    if (props.graphState === "update") {
        return <CytographEditUpdate nodes={props.CytographProps.nodes} edges={props.CytographProps.edges} setNodes={props.CytographProps.setNodes} setEdges={props.CytographProps.setEdges}/>
    }
    if (props.graphState === "delete") {
        return <CytographEditDelete nodes={props.CytographProps.nodes} edges={props.CytographProps.edges} setNodes={props.CytographProps.setNodes} setEdges={props.CytographProps.setEdges}/>
    }
    return null
}

const activeStyle = (component: string, state: string) => {
    if (state === component) {
        return "text.primary"
    } else {
        return "inherit"
    }
}

export default function CytographRender(props: CytographMasterProps) {
    const [graphState, setGraphState] = useState<string>("preset") 
    return (
        <div className="cytograph-edit">
            <Box className="button_group">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color={activeStyle("preset", graphState)} sx={{cursor: 'pointer'}} onClick={() => setGraphState("preset")}>
                        Preset
                    </Link>
                    <Link underline="hover" color={activeStyle("algo", graphState)} sx={{cursor: 'pointer'}} onClick={() => setGraphState("algo")}>
                        Algorithm
                    </Link>
                    <Link underline="hover" color={activeStyle("add", graphState)} sx={{cursor: 'pointer'}} onClick={() => setGraphState("add")}>
                        Add
                    </Link>
                    <Link underline="hover"  color={activeStyle("update", graphState)} sx={{cursor: 'pointer'}} onClick={() => setGraphState("update")}>
                        Update
                    </Link>
                    <Link underline="hover"  color={activeStyle("delete", graphState)} sx={{cursor: 'pointer'}} onClick={() => setGraphState("delete")}>
                        Delete
                    </Link>
                </Breadcrumbs>
            </Box>
            <EditRender graphState={graphState} CytographProps={props}/>
        </div>
    )
}