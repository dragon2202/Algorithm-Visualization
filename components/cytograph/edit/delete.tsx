import CytographPropsEdit from '../../props/cytograph_edit_props'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import { FormControl } from '@mui/material'
import { useState } from 'react'

export default function CytographEditDelete(props: CytographPropsEdit) {
    const [node, setNode] = useState<string>('')
    const [edge, setEdge] = useState<string>('')

    //Delets Nodes from graph and all edges related to the node
    function deleteNode (event: any) {
        event.preventDefault()
        let newNodes = [...props.nodes]
        let newEdges = [...props.edges]
        //puts all nodes that aren't selected node in a new array
        newNodes = newNodes.filter((item) => item.data.id !== event.target.nodeSelect.value)
        //puts all edges that aren't a source or edges
        newEdges = newEdges.filter((item) => item.data.source !== event.target.nodeSelect.value)
        newEdges = newEdges.filter((item) => item.data.target !== event.target.nodeSelect.value)
        setNode('')
        props.setNodes(newNodes)
        setEdge('')
        props.setEdges(newEdges)
    }

    //Delets Edges from graph
    function deleteEdge (event: any) {
        event.preventDefault()
        try {
            const obj = JSON.parse(event.target.edgeWeightSelect.value)
            let newEdges = [...props.edges]
            //puts all edges that aren't a source to a target | target to source. Using || operator to combine it doesn't work
            newEdges = newEdges.filter((item) => !(item.data.source === obj?.source && item.data.target === obj?.target))
            newEdges = newEdges.filter((item) => !(item.data.source === obj?.target && item.data.target === obj?.source))
            setEdge('')
            props.setEdges(newEdges)
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className="cytograph-edit-delete">
            <Box className="form">
                <h2>Delete Node/Edge</h2>
                <form onSubmit={(event) => deleteNode(event)}>
                    <FormControl fullWidth className="node">
                        <InputLabel>Node</InputLabel>
                        <Select label="node" name="nodeSelect" defaultValue={''} value={node} onChange={(event) => setNode(event.target.value)}>
                            <MenuItem value={''} key={0}>None</MenuItem>
                            {
                                props.nodes.map((item) => {
                                    return (
                                        <MenuItem value={item.data.id} key={item.data.id}>
                                            {item.data.label}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <Button variant="contained" className="button" type="submit">Delete Node</Button>
                    </FormControl>
                </form>
                <br />
                <Divider />
                <br />
                <form onSubmit={(event) => deleteEdge(event)}>
                    <FormControl fullWidth className="edge">
                        <InputLabel>Edge</InputLabel>
                        <Select label="Edge" className="edgeWeightSelect" name="edgeWeightSelect" defaultValue={''} value={edge} onChange={(event) => setEdge(event.target.value)}>
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
                        <Button variant="contained" className="button" type="submit">Delete Edge</Button>
                    </FormControl>
                </form>
            </Box>
        </div>
    )
}