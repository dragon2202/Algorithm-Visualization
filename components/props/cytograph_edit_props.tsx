interface node {
    data : {
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
        weight: string
    }
}

interface CytographEdit {
    nodes: node[]
    edges: edge[]
    setNodes: (value: any) => void
    setEdges: (value: any) => void
}

export default CytographEdit