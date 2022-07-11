import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navigation from '../components/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

import { GraphInfo } from '../components/text/graph-info-text'
import Cytograph from '../components/cytograph/cytograph'
import CytographRender from '../components/cytograph/cytograph-render'

/* 
  let edges: any[] = []

  useEffect(() => {
    if (props.previous.length !== 0) {
      for(var i = 1; i < props.nodes.length; i++) {
        //const edge = props.edges.find((item) => (item.data.source === props.nodes[i].data.id && item.data.target === props.previous[i]) || (item.data.source === props.previous[i] && item.data.target === props.nodes[i].data.id))
        const edge = props.edges.find((item) => (item.data.source === props.nodes[i].data.id && item.data.target === props.previous[i].toString()) || (item.data.source === props.previous[i].toString() && item.data.target === props.nodes[i].data.id))
        edges.push(edge)
      }
      setPassedElements([...props.nodes, ...edges])
    }
  },[props.previous])

*/

const Graph: NextPage = () => {
  const [nodes, setNodes] = useState([
    { data: { id: '1', label: '1' }, position: { x: 50, y: 50 } },
    { data: { id: '2', label: '2' }, position: { x: 150, y: 50 } },
    { data: { id: '3', label: '3' }, position: { x: 250, y: 50 } }
  ])

  const [edges, setEdges] = useState([
    { data: { source: '1', target: '2', label: 'Node 1 to Node 2', weight: '3' } },
  ])

  const [distance, setDistance] = useState<Array<any>>([])
  const [previous, setPrevious] = useState<Array<any>>([])
  let newEdges: any[] = []
  //useEffect to construct a new graph with only edges optimized by dijkstra
  //previous is the array of node id's that are parents of node[i]
  useEffect(() => {
    if (previous.length !== 0) {
      for(var i = 1; i < nodes.length; i++) {
        if(previous[i] !== null) {
          let edge: any = edges.find((item) => (item.data.source === nodes[i].data.id && item.data.target === previous[i].toString()) || (item.data.source === previous[i].toString() && item.data.target === nodes[i].data.id))
          newEdges.push(edge)
        }
      }
      setEdges([...newEdges])
    }
  },[previous])

  return (
    <div>
      <Head>
        <title>Graph</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='graph'>
        <h3 className='header'>Graph Theory</h3>
        <Navigation />
        <div className='content'>
          <Card className='display'>
            <CardHeader
              title={
                <Tooltip title={GraphInfo} placement="bottom-start">
                  <Button>Graph Theory</Button>
                </Tooltip>
              }
            />
            <CardContent>
                <Cytograph nodes={nodes} edges={edges} distance={distance} previous={previous}/>
            </CardContent>
          </Card>

          <Card className='update'>
            <CardContent>
              <CytographRender 
                nodes={nodes} 
                edges={edges} 
                distance={distance} 
                previous={previous} 
                setNodes={setNodes} 
                setEdges={setEdges} 
                setDistance={setDistance} 
                setPrevious={setPrevious}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Graph
