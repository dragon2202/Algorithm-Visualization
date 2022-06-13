import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';

interface node {
    data: {
        id: string
        label: string
    }
    position: {
        x: number
        y: number
    }
}

interface edge {
    data: {
        source: string
        target: string
        label: string
    }
}

interface CryptographEditProps {
    nodes: node[]
    edges: edge[]
    setNodes: (value: any) => void
    setEdges: (value: any) => void
}


export default function CytographEdit(props: CryptographEditProps) {
    const [selectedNode, setSelectedNode] = useState('');
    const [selectedNode2, setSelectedNode2] = useState('');
    const [showAddEdge, setShowAddEdge] = useState<boolean>(true)
    useEffect(() => {
        let source = props.edges.find(item => item.data.source === selectedNode)
        let target = props.edges.find(item => item.data.target === selectedNode)
        setShowAddEdge(false)
        
        if(source !== undefined) {
            if(source.data.target !== selectedNode2) {
                setShowAddEdge(true)
            }
        }

        if(target !== undefined) {
            if(target.data.source !== selectedNode2) {
                setShowAddEdge(true)
            }
        }
        
        if(selectedNode === "" || selectedNode2 === "") {
            setShowAddEdge(true)
        }

        if(selectedNode === selectedNode2) {
            setShowAddEdge(true)
        }

    },[selectedNode, selectedNode2])

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedNode(event.target.value as string);
    }
    const handleChange2 = (event: SelectChangeEvent) => {
        setSelectedNode2(event.target.value as string);
    }

    function handleAddNode(event: any) {
        event.preventDefault()
        props.setNodes([...props.nodes, { data: { id: (props.nodes.length + 1).toString(), label: event.target.addNode.value }, position: { x: 300, y: 200 } }])
    }

    function handleAddEdge(event: any) {
        event.preventDefault()
        console.log(selectedNode)
        console.log(selectedNode2)
        props.setNodes([...props.edges, { data: {  source: selectedNode.toString(), target: selectedNode2.toString(), label: "2" } }])
    }

    return (
        <div className="cytograph-edit">
            <Box className="form">
                <h2>Update Current Graph</h2>
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
                        <InputLabel>Selected Node</InputLabel>
                        <Select value={selectedNode} label="Selected Node" onChange={(event) => handleChange(event)}>
                            <MenuItem value={''} key={0}>None</MenuItem>
                            {
                                props.nodes.map((item) => {
                                    return (
                                        <MenuItem value={item.data.id} key={item.data.id}>{item.data.label}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <InputLabel>Selected Node 2</InputLabel>
                        <Select value={selectedNode2} label="Selected Node 2" onChange={(event) => handleChange2(event)}>
                            <MenuItem value={''} key={0}>None</MenuItem>
                            {
                                props.nodes.map((item) => {
                                    return (
                                        <MenuItem value={item.data.id} key={item.data.id}>{item.data.label}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <br />
                        <Button variant="contained" className="button" type="submit" disabled={showAddEdge}> Add Edge</Button>
                    </form>
                </Box>
            </Box>
        </div>

    )
}