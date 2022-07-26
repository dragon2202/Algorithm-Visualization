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

interface Cytograph {
    nodes: node[]
    edges: edge[]
    distance: string[]
    previous: string[]
    setNodes: (value: any) => void
    setEdges: (value: any) => void
    setDistance: (value: any) => void
    setPrevious: (value: any) => void
}

export default Cytograph