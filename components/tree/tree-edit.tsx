import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FormControl } from '@mui/material'
import TextField from '@mui/material/TextField'

//Defined Tree Object
interface treeObject {
    name: string,
    children: Array<any>
}
//Defined Tree Props passed to this component
interface Tree {
    treeData: treeObject
    setTreeData: (value: any) => void
    nodeList: Array<string>
    setNodeList: (value: any) => void
}

export default function TreeEdit(props: Tree) {
    const [parentNode, setParentNode] = useState<string>("0")
    return (
        <Box className="tree-edit-box">
            <h4 className="header-4">Tree Edit</h4>
            <FormControl fullWidth className="text-field">
                <InputLabel>
                    Parent Node
                </InputLabel>
                <Select className='select' value={parentNode} label="tree" onChange={(event: SelectChangeEvent) => setParentNode(event.target.value as string)}>
                    <MenuItem value="">None</MenuItem>
                    {
                        props.nodeList.map((item) => {
                            return(
                                <MenuItem value={item}>{item}</MenuItem>
                            )
                        })
                    }
                </Select>
                <Button onClick={() => console.log(props.nodeList)}>Submit</Button>
            </FormControl>
        </Box>
    )
}