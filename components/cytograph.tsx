import dynamic from 'next/dynamic';
const CytoscapeComponent = dynamic(()=> import('react-cytoscapejs'), {
    ssr:false,
})

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
        label: string
        weight: string
    }
}

interface CryptographProps {
    nodes: node[]
    edges: edge[]
}

export default function cytograph(props: CryptographProps) {
    let passedElements = [...props.nodes, ...props.edges]
    return (
        <CytoscapeComponent 
            className='cytoscape-graph' 
            elements={passedElements} 
            zoomingEnabled={false}
            stylesheet={[{
                selector: 'edge',
                css: {
                  'label': '3',
                  'text-margin-y': 15,
                  'text-rotation': 'autorotate'
                }
            }]}
        />
    )
}

//https://github.com/plotly/react-cytoscapejs
//https://github.com/cytoscape/cytoscape.js/blob/master/documentation/demos/animated-bfs/code.js