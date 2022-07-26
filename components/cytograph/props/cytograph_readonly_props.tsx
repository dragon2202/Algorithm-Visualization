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

interface CytographProps {
    nodes: node[]
    edges: edge[]
    distance: string[]
    previous: string[]
}


export default CytographProps