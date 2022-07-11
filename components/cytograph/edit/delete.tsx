import CytographProps from '../../props/cytograph_props'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography';
import { FormControl } from '@mui/material'
import { useState } from 'react'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function CytographEditDelete(props: CytographProps) {
    const [open, setOpen] = useState(false)
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

    //Delets Edges from graph
    function deleteAll (event: any) {
        event.preventDefault()
        props.setNodes([])
        props.setEdges([])
        setOpen(false)
    }
    
    return (
        <div className="cytograph-edit-delete">
            <Box className="form">
                <h2>Delete Node/Edge</h2>
                <Button variant="contained" className="deleteAll" type="submit" onClick={() => setOpen(true)}>Delete all Nodes/Edges</Button>
                <Divider />
                <br />
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
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete all Nodes and Edges
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete all nodes and edges?
                    </Typography>
                    <Button variant="contained" type="submit" onClick={deleteAll} sx={{marginTop: '12px'}}>
                        Delete
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}