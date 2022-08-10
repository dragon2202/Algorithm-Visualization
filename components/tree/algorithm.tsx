import { useState } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

//Defined Tree Object
interface treeObject {
    name: string,
    children: Array<any>
}
//Defined Tree Props passed to this component
interface Tree {
    treeData: treeObject
    setTreeData: (value: any) => void
}

//Preorder Traversal is a tree traversal algorithm using recursion to traverse the tree by visiting node, traversing to left child, traversing to right child
function PreOrderTraversal (tree: treeObject | undefined, output: Array<string>, setOutput: (value: any) => void) {
    if (tree?.name !== undefined) {
        setOutput((items: any) => [...items, tree?.name])//print base node
        PreOrderTraversal(tree?.children[0], output, setOutput)//recursive call passing left child
        PreOrderTraversal(tree?.children[1], output, setOutput)//recursive call passing right child
    }
}

//InOrder Traversal is a tree traversal algorithm using recursion to traverse the tree by traversing to left child, visiting node, traversing to right child
function InOrderTraversal (tree: treeObject | undefined, output: Array<string>, setOutput: (value: any) => void) {
    if (tree?.name !== undefined) {
        InOrderTraversal(tree?.children[0], output, setOutput)//recursive call passing left child
        setOutput((items: any) => [...items, tree?.name])//print base node
        InOrderTraversal(tree?.children[1], output, setOutput)//recursive call passing right child
    }
}

//PostOrder Traversal is a tree traversal algorithm using recursion to traverse the tree by traversing to left child, visiting node, traversing to right child
function PostOrderTraversal (tree: treeObject | undefined, output: Array<string>,setOutput: (value: any) => void) {
    if (tree?.name !== undefined) {
        PostOrderTraversal(tree?.children[0], output, setOutput)//recursive call passing left child
        PostOrderTraversal(tree?.children[1], output, setOutput)//recursive call passing right child
        setOutput((items: any) => [...items, tree?.name])//print base node
    }
}

function applyTraversal(traversal: (tree: treeObject | undefined, output: Array<string>, setOutput: (value: any) => void) => void, tree: treeObject | undefined, output: Array<string>, setOutput: (value: any) => void) {
    setOutput([])
    traversal(tree, output, setOutput)
}

export default function Algorithm(props: Tree) {
    const [output, setOutput] = useState<Array<string>>([])
    return (
        <div className='algorithm'>
            <h4 className="header-4">Binary Tree Traversal</h4>
            <ButtonGroup orientation="vertical" variant="contained" className="buttongroup">
                <Button onClick={() => applyTraversal(PreOrderTraversal, props.treeData, output, setOutput)} variant='contained' className='preorder'>Preorder Traversal</Button>
                <Button onClick={() => applyTraversal(InOrderTraversal, props.treeData, output, setOutput)} variant='contained' className='inorder'>Inorder Traversal</Button>
                <Button onClick={() => applyTraversal(PostOrderTraversal, props.treeData, output, setOutput)} variant='contained' className='postorder'>Postorder Traversal</Button>
                <Button onClick={() => setOutput([])} className="clear">Clear</Button>
            </ButtonGroup>
            {(output.length !== 0) ? <div>Output: {output.join(" ")}</div>: null}
        </div>
    )
}