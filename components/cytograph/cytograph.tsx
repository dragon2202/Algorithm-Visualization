import dynamic from 'next/dynamic';
import CytographProps from '../props/cytograph_props'
const CytoscapeComponent = dynamic(()=> import('react-cytoscapejs'), {
    ssr:false,
})

export default function cytograph(props: CytographProps) {
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