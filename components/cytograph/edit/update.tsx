import { useEffect, useState } from 'react'
import CytographProps from '../../props/cytograph_props'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { FormControl } from '@mui/material'

export default function CytographEditUpdate(props: CytographProps) {
    const [node, setNode] = useState<string>('')
    const [nodeBoolean, setNodeBoolean] = useState<boolean>(true)
    const [edge, setEdge] = useState<string>('')
    const [edgeBoolean, setEdgeBoolean] = useState<boolean>(true)

    useEffect(() => {
        if(node === '') {
            setNodeBoolean(true)
        } else {
            setNodeBoolean(false)
        }
    },[node])

    useEffect(() => {
        if(edge === '') {
            setEdgeBoolean(true)
        } else {
            setEdgeBoolean(false)
        }
    },[edge])

    //updates selected node's name
    function updateNode(event: any) {
        event.preventDefault()
        let newNodes = [...props.nodes]
        //Find Index, then use index to search the shallow copy array so that we can update the label with form data
        newNodes[props.nodes.findIndex(item => item.data.id === event.target.nameSelect.value)].data.label = event.target.nameTextField.value
        event.target.nameTextField.value = ''//Reset Field
        props.setNodes(newNodes)
    }

    function updateEdge(event: any) {
        event.preventDefault()
        try {
            const obj = JSON.parse(event.target.edgeWeightSelect.value)
            let newEdges = [...props.edges]
            //Find Index, then use index to search the shallow copy array so that we can update weight
            //We have to do it twice as source and target and target source is same link but saved differently
            let source_target_index = props.edges.findIndex(item => item.data.source === obj?.source && item.data.target === obj?.target)
            let target_source_index = props.edges.findIndex(item => item.data.source === obj?.target && item.data.target === obj?.source)
            //One will return a valid integer which should be the index (0, 1, 2,....) and one will return -1 as default rejection value
            //Valid integer index will always beat -1 and then we will know if its source to target or target to value and apply the right index
            if(source_target_index > target_source_index) {
                newEdges[source_target_index].data.weight = event.target.edgeWeightTextField.value.toString()
                props.setEdges(newEdges)
            } else {
                newEdges[target_source_index].data.weight = event.target.edgeWeightTextField.value.toString()
                props.setEdges(newEdges)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="cytograph-edit-update">
            <Box className="form">
                <h2>Update Node/Edge</h2>
                <form onSubmit={(event) => updateNode(event)}>
                    <FormControl fullWidth className="node">
                        <InputLabel>Node</InputLabel>
                        <Select label="Source" name="nameSelect" defaultValue={''} onChange={(event) => setNode(event.target.value)}>
                            <MenuItem value={''} key={0}>None</MenuItem>
                            {
                                props.nodes.map((item, index) => {
                                    return (
                                        <MenuItem value={item.data.id} key={index}>{item.data.label}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <TextField className="textfield" name='nameTextField' required/>
                        <Button variant="contained" className="button" type="submit" disabled={nodeBoolean}>Update Name</Button>
                    </FormControl>
                </form>
                <br />
                <Divider />
                <br />
                <form onSubmit={(event) => updateEdge(event)}>
                    <FormControl fullWidth className="edge">
                        <InputLabel>Edge</InputLabel>
                        <Select label="Edge" className="edgeWeightSelect" name="edgeWeightSelect" defaultValue={''} onChange={(event) => setEdge(event.target.value)}>
                            <MenuItem value={''} key={0}>None</MenuItem>
                            {
                                props.edges.map((item, index) => {
                                    return (
                                        <MenuItem value={JSON.stringify({source: item.data.source, target: item.data.target})} key={index}>
                                            {props.nodes.find((node) => node.data.id === item.data.source)?.data.label + " to " + props.nodes.find((node) => node.data.id === item.data.target)?.data.label}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <TextField className="textfield" name='edgeWeightTextField' type='number' required/>
                        <Button variant="contained" className="button" type="submit" disabled={edgeBoolean}>Update Edge</Button>
                    </FormControl>
                </form>
            </Box>
        </div>
    )
}