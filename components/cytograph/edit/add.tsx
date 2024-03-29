import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { FormControl } from '@mui/material'

import CytographProps from '../props/cytograph_props'

export default function CytographEditAdd(props: CytographProps) {
    const [selectedNode, setSelectedNode] = useState<string>('')
    const [selectedNode2, setSelectedNode2] = useState<string>('')
    const [weight, setWeight] = useState<number>(0)
    const [showAddEdge, setShowAddEdge] = useState<boolean>(true)//disabled requires true to disable button
    useEffect(() => {
        //First Select is the source, and Second Select is the target. Find if there's an edge matching source to target relationship
        let source_target = props.edges.find(item => item.data.source === selectedNode && item.data.target === selectedNode2)
        //Second Select is the source, and First Select is the target. This is just a reverse of source_target
        let target_source = props.edges.find(item => item.data.source === selectedNode2 && item.data.target === selectedNode)
        //If both selected input is empty string or non selected
        if (selectedNode !== '' && selectedNode2 !== '') {
            setShowAddEdge(false)//
            if (selectedNode === selectedNode2) {//if two nodes are the same
                setShowAddEdge(true)
            }
            if (source_target !== undefined) {//If there is no edge from source to target
                setShowAddEdge(true)
            }
            if (target_source !== undefined) {//If there is no edge from target to source
                setShowAddEdge(true)
            }
        }
    }, [selectedNode, selectedNode2])

    function handleAddNode(event: any) {
        event.preventDefault()
        if(props.nodes.length === 0) {
            
        props.setNodes([...props.nodes, { data: { id: (1).toString(), label: event.target.addNode.value }, position: { x: 300, y: 200 } }])
        } else {
            
        props.setNodes([...props.nodes, { data: { id: (parseInt(props.nodes[props.nodes.length - 1].data.id) + 1).toString(), label: event.target.addNode.value }, position: { x: 300, y: 200 } }])
        }
    }

    function handleAddEdge(event: any) {
        event.preventDefault()
        props.setEdges([...props.edges, 
            { data: 
                { 
                    source: selectedNode.toString(), 
                    target: selectedNode2.toString(), 
                    weight: weight.toString(),
                } 
            }
        ])
        setSelectedNode(''), setSelectedNode2(''), setShowAddEdge(true)//reset all states
    }

    return (
        <div className="cytograph-edit-add">
            <Box className="form" >
                <h2>Add Node/Edge</h2>
                <div className='node'>
                    <form onSubmit={(event) => handleAddNode(event)}>
                        <TextField className="addNode" label="New Node Name" variant="standard" name='addNode' required={true} />
                        <Button variant="contained" className="button" type="submit"> Add Node</Button>
                    </form>
                </div>
                <br />
                <Divider />
                <br />
                <Box className="selectingNodes">
                    <form onSubmit={(event) => handleAddEdge(event)}>
                        <Box className="two_nodes" >
                            <FormControl fullWidth className="source">
                                <InputLabel>Source</InputLabel>
                                <Select value={selectedNode} label="Source" onChange={(event: SelectChangeEvent) => setSelectedNode(event.target.value as string)}>
                                    <MenuItem value={''} key={0}>None</MenuItem>
                                    {
                                        props.nodes.map((item) => {
                                            return (
                                                <MenuItem value={item.data.id} key={item.data.id}>{item.data.label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth className="target">
                                <InputLabel>Target</InputLabel>
                                <Select value={selectedNode2} label="Target" onChange={(event: SelectChangeEvent) => setSelectedNode2(event.target.value as string)}>
                                    <MenuItem value={''} key={0}>None</MenuItem>
                                    {
                                        props.nodes.map((item) => {
                                            return (
                                                <MenuItem value={item.data.id} key={item.data.id}>{item.data.label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className="weight_button">
                            <FormControl fullWidth sx={{width: "45%"}}>
                                <TextField label="Number" type="number" onChange={(event) => setWeight(parseInt(event.target.value as string))}/>
                            </FormControl>
                        </Box>
                        <Button variant="contained" className="button" type="submit" disabled={showAddEdge}>Add Edge</Button>
                    </form>
                </Box>
            </Box>
        </div>
    )
}