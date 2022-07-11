import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import CytographProps from '../props/cytograph_readonly_props'
const CytoscapeComponent = dynamic(() => import('react-cytoscapejs'), {
  ssr: false,
})

export default function cytograph(props: CytographProps) {
  let passedElements = [...props.nodes, ...props.edges]
  useEffect(()=>{console.log(passedElements)},[])
  return (
    <CytoscapeComponent
      className='cytoscape-graph'
      elements={passedElements}
      zoomingEnabled={false}
      stylesheet={[
        {
          selector: 'node',
          css: {
            'height': 55,
            'width': 55,
            'content': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center'
          }
        },
        {
          selector: 'edge',
          css: {
            'label': 'data(weight)',
            'font-weight': 'bold',
          }
        }
      ]}
    />
  )
}

//https://github.com/plotly/react-cytoscapejs
//https://github.com/cytoscape/cytoscape.js/blob/master/documentation/demos/animated-bfs/code.js