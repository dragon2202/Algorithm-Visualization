import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup';

import CytographPropsEdit from '../../props/cytograph_edit_props'
import CytographEditAdd from './add'
import CytographEditUpdate from './update'
import CytographEditDelete from './delete'
import { Typography } from '@mui/material';

interface EditRenderProps {
    graphState: string,
    CytographPropsEdit: CytographPropsEdit
}

const EditRender = (props : EditRenderProps) => {
    if (props.graphState === "add") {
        return <CytographEditAdd nodes={props.CytographPropsEdit.nodes} edges={props.CytographPropsEdit.edges} setNodes={props.CytographPropsEdit.setNodes} setEdges={props.CytographPropsEdit.setEdges}/>
    } 
    if (props.graphState === "update") {
        return <CytographEditUpdate nodes={props.CytographPropsEdit.nodes} edges={props.CytographPropsEdit.edges} setNodes={props.CytographPropsEdit.setNodes} setEdges={props.CytographPropsEdit.setEdges}/>
    }
    if (props.graphState === "delete") {
        return <CytographEditDelete nodes={props.CytographPropsEdit.nodes} edges={props.CytographPropsEdit.edges} setNodes={props.CytographPropsEdit.setNodes} setEdges={props.CytographPropsEdit.setEdges}/>
    }
    return null
}

export default function CytographRender(props: CytographPropsEdit) {
    const [graphState, setGraphState] = useState<string>("add") 
    return (
        <div className="cytograph-edit">
            <Box className="button_group">
                <ButtonGroup variant="contained">
                    <Button onClick={() => setGraphState("add")}>Add</Button>
                    <Button onClick={() => setGraphState("update")}>Update</Button>
                    <Button onClick={() => setGraphState("delete")}>Delete</Button>
                </ButtonGroup>
            </Box>
            <EditRender graphState={graphState} CytographPropsEdit={props}/>
        </div>
    )
}