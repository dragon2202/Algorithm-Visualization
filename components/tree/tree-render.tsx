import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

import PresetTree from '../tree/presetTree'
import TreeEdit from '../tree/tree-edit'

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

interface RenderProps {
    treeState: string,
    tree: Tree
    nodeList: Array<string>
    setNodeList: (value: any) => void
    value: string
    setValue: (value: string) => void
}

const FunctionRender = (props: RenderProps) => {
    switch(props.treeState){
        case 'preset':
            return(<PresetTree treeData={props.tree.treeData} setTreeData={props.tree.setTreeData} setNodeList={props.tree.setNodeList} value={props.value} setValue={props.setValue} />)
        case 'edit':
            return(<TreeEdit treeData={props.tree.treeData} setTreeData={props.tree.setTreeData} nodeList={props.nodeList} setNodeList={props.setNodeList}/>)
    }
    
    return null
}
const activeStyle = (component: string, state: string) => {
    if (state === component) {
        return "text.primary"
    } else {
        return "inherit"
    }
}

export default function TreeRender(props: Tree) {
    const [treeState, setTreeState] = useState<string>('preset')
    const [value, setValue] = useState<string>('0')
     return (
        <div className="tree-functions">
            <Card className="card"> 
                <CardContent>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color={activeStyle("edit", treeState)} sx={{cursor: 'pointer'}} onClick={() => setTreeState("edit")}>
                            Edit
                        </Link>
                        <Link underline="hover" color={activeStyle("preset", treeState)} sx={{cursor: 'pointer'}} onClick={() => setTreeState("preset")}>
                            Preset
                        </Link>
                    </Breadcrumbs>
                    <FunctionRender treeState={treeState} tree={props} nodeList={props.nodeList} setNodeList={props.setNodeList} value={value} setValue={setValue}/>
                </CardContent>
            </Card>
        </div>
     )
}