import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { ToastContainer, toast } from 'react-toastify'
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
    const [parentNode, setParentNode] = useState<string>("")
    const [value, setValue] = useState<string>("")

    function treeEdit(tree: treeObject, newValue: string, operation: string) {
        if(operation === "add") {
            tree.children.push({name: newValue, children: []})
        }
        if(operation === "update") {
            tree.name = newValue
        }
    }

    function addChild(tree: treeObject, setTreeData: (value: any) => void, nodeList: Array<string>, setNodeList: (value: any) => void, passedNode: string, newValue: string){
        if (nodeList.includes(newValue)) {
            toast("No duplicates allowed in the tree")
            return
        }
        const object: treeObject = structuredClone(tree)
        PreOrderTraversalNAry(object, passedNode, newValue, "add")
        setTreeData(object)
        setNodeList([...nodeList, newValue])
    }

    function updateNode(tree: treeObject, setTreeData: (value: any) => void, nodeList: Array<string>, setNodeList: (value: any) => void, passedNode: string, newValue: string){
        if (nodeList.includes(newValue)) {
            toast("No duplicates allowed in the tree")
            return
        }
        const object: treeObject = structuredClone(tree)
        PreOrderTraversalNAry(object, passedNode, newValue, "update")
        setTreeData(object)
        const index = nodeList.findIndex((item) => item === passedNode)
        const newNodeList = [...nodeList]
        newNodeList[index] = newValue
        setNodeList(newNodeList)
    }

    //https://stackoverflow.com/questions/69488600/javascript-update-nested-object-values-from-array-of-update-objects
    function PreOrderTraversalNAry (tree: treeObject, passedNode: string, newValue: string, operation: string): any {
        if (tree?.name !== undefined) {
            if(passedNode === tree?.name) {
                treeEdit(tree, newValue, operation)
                return
            }
            for(let i = 0; i < tree.children.length; i++) {
                PreOrderTraversalNAry(tree?.children[i], passedNode, newValue, operation)
            }
        }
    }

    return (
        <Box className="tree-edit-box">
            <h4 className="header-4">Tree Edit</h4>
            <form onSubmit={(event: any) => {event.preventDefault(); addChild(props.treeData, props.setTreeData, props.nodeList, props.setNodeList, parentNode, event.target.number.value)}}>
                <FormControl fullWidth className="form-control">
                    <InputLabel>
                        Parent Node
                    </InputLabel>
                    <Select className='select' name="parentNode" value={parentNode} label="tree" onChange={(event: SelectChangeEvent) => setParentNode(event.target.value as string)}>
                        <MenuItem value="">None</MenuItem>
                        {
                            props.nodeList.map((item, index) => {
                                return(
                                    <MenuItem value={item} key={index}>{item}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <TextField name="number" variant="outlined" type="number" className="number-field" required={true}/>
                    <Button type="submit" className="button" variant="contained">Add new node to parent</Button>
                </FormControl>
            </form>
            <ToastContainer theme='dark' autoClose={10000}/>
        </Box>
    )
}

/*
    //https://stackoverflow.com/questions/69488600/javascript-update-nested-object-values-from-array-of-update-objects
    function PreOrderTraversalNAry(parentTree: treeObject, tree: treeObject, passedNode: any): any {
        console.log(tree)
        if (tree?.name !== undefined) {
            if(passedNode === tree?.name) {
                tree.children.push({name: "100", children: []})
            }
            for(let i = 0; i < tree.children.length; i++) {
                PreOrderTraversalNAry(parentTree, tree?.children[i], passedNode)
            }
        }
    }
*/