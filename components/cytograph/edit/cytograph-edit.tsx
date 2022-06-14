import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import { FormControl } from '@mui/material'

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