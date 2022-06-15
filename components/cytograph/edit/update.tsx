import { useState, useRef } from 'react'
import CytographPropsEdit from '../../props/cytograph_edit_props'
import Box from '@mui/material/Box'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'

export default function CytographEditUpdate(props: CytographPropsEdit) {
    const [input, setInput] = useState<string>("")
    const [node, setNode] = useState<string>("")

    //updates selected node's name
    function updateName(event: any) {
        event.preventDefault()
        let newNodes = [...props.nodes]
        newNodes[props.nodes.findIndex(item=> item.data.id === node)].data.label = input
        props.setNodes(newNodes), setInput("")
    }

    return (
        <div className="cytograph-edit-update">
            <Box className="form">
                <h2>Update Node/Edge</h2>
                <form onSubmit={(event) => updateName(event)}>
                    <FormControl fullWidth className="node">
                        <InputLabel>Node</InputLabel>
                        <Select value={node} label="node" onChange={(event: SelectChangeEvent) => setNode(event.target.value as string)}>
                            <MenuItem value={''} key={0}>None</MenuItem>
                            {
                                props.nodes.map((item) => {
                                    return (
                                        <MenuItem value={item.data.id} key={item.data.id}>{item.data.label}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <TextField className="textfield" name='updateName' value={input} onChange={(event) => setInput(event.target.value as string)}/>
                        <Button variant="contained" className="button" type="submit">Add Edge</Button>
                    </FormControl>
                </form>
            </Box>
        </div>
    )
}