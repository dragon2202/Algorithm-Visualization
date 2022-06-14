import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup';

import CytographPropsEdit from '../../props/cytograph_edit_props'
import CytographEditAdd from './add'

export default function CytographEdit(props: CytographPropsEdit) {

    return (
        <div className="cytograph-edit">
            <Box className="button_group">
                <ButtonGroup variant="contained">
                    <Button>Add</Button>
                    <Button>Update</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
            </Box>
            <CytographEditAdd nodes={props.nodes} edges={props.edges} setNodes={props.setNodes} setEdges={props.setEdges}/>
        </div>
    )
}