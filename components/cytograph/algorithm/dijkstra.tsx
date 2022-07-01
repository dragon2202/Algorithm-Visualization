import CytographProps from '../../props/cytograph_props'
import {useState} from 'react'

function test(item: any) {
    const foundItem = item.edges.filter((item: any) => item.data.source === "1" || item.data.target === "1")
    console.log(foundItem)
}

export default function Dijkstra(props: CytographProps) {
    let unvisited = props.nodes.map(item => item.data.id)
    let visited = []
    let distance = new Array(props.nodes.length)
    let previous = new Array(props.nodes.length)
    let index = 0
    distance.fill(99999)
    previous.fill(null)
    for (let i = 0; i < props.nodes.length; i++) {
        if (i === 0) {
            const startingNode = unvisited.shift()
            visited.push(startingNode)//remove first element from unvisited and pushing to visited
            distance[i] = 0

            const edgesConnected = props.edges.filter((item: any) => item.data.source === startingNode || item.data.target === startingNode)
            for (let j = 0; j < edgesConnected.length; j++) {
                //find index of node array based of source/target
                //if node is n places of props.node than distance[n] and previous[n] is changed to mimic a mapping
                if(edgesConnected[j].data.source === startingNode) {
                    index = props.nodes.findIndex(item => item.data.id === edgesConnected[j].data.target)
                } else {
                    index = props.nodes.findIndex(item => item.data.id === edgesConnected[j].data.source)
                }
                if (distance[index] > edgesConnected[j].data.weight) {
                    distance[index] = parseInt(edgesConnected[j].data.weight)
                    previous[index] = parseInt(startingNode!)
                }
            }
            console.log(distance)
            console.log(previous)
        }
    }
    //test(props)
}


/*
    let distance = []
    let previous = []
    let visitied = []
    let unvisited = []
*/
//https://gist.github.com/Prottoy2938/66849e04b0bac459606059f5f9f3aa1a

//https://www.youtube.com/watch?v=K_1urzWrzLs
//https://www.programiz.com/dsa/dijkstra-algorithm
//https://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript