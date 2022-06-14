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
            stylesheet={[   
            {
                selector: 'node',
                css: {
                  'content': 'data(label)',
                  'text-margin-y': -25,
                  'text-valign': 'center',
                  'text-halign': 'center'
                }
              },
              {
                selector: 'edge',
                css: {
                  'label': 'data(weight)',
                  'text-margin-y': 20,
                  'text-rotation': 'autorotate'
                }
            }]}
        />
    )
}

//https://github.com/plotly/react-cytoscapejs
//https://github.com/cytoscape/cytoscape.js/blob/master/documentation/demos/animated-bfs/code.js