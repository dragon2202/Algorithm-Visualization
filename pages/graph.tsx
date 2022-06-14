import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Navigation from '../components/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

import { GraphInfo } from '../components/text/graph-info-text'
import Cytograph from '../components/cytograph/cytograph'
import CytographEdit from '../components/cytograph/edit/cytograph-edit'


const Graph: NextPage = () => {
  const [nodes, setNodes] = useState([
    { data: { id: '1', label: 'Node 1' }, position: { x: 50, y: 50 } },
    { data: { id: '2', label: 'Node 2' }, position: { x: 150, y: 50 } },
    { data: { id: '3', label: 'Node 3' }, position: { x: 250, y: 50 } }
  ])

  const [edges, setEdges] = useState([
    { data: { source: '1', target: '2', weight: '3' } },
  ])

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
                <Cytograph nodes={nodes} edges={edges}/>
            </CardContent>
          </Card>

          <Card className='update'>
            <CardContent>
              <CytographEdit nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Graph