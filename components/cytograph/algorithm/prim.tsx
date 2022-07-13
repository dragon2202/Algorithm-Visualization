import CytographProps from '../../props/cytograph_master_props'

export default function Prim (props: CytographProps) {
    let startingNode = props.nodes[0].data.id//first node in array is default starting point
    let visited: any = []//keep track of visited nodes to prevent cycles
    visited.push(props.nodes[0].data.id)
    let MinimumSpanningTree_Edges = []
    let edgesToBeConsidered: any= []
    
    const edgesConnected = props.edges.filter((item: any) => item.data.source === startingNode || item.data.target === startingNode)

    edgesToBeConsidered.push(...edgesConnected)
    const weightsToBeConsidered = edgesToBeConsidered.map((item: any) => parseInt(item.data.weight))
    const min = Math.min.apply(null, weightsToBeConsidered)

    const indexesOfAllMinNum = []
    for (let i = 0; i < weightsToBeConsidered.length; i++) {
        if(weightsToBeConsidered[i] === min) {
            indexesOfAllMinNum.push(i)
        }
    }

    for (let i = 0; i < indexesOfAllMinNum.length; i++) {
        if(visited.includes(parseInt(edgesToBeConsidered[indexesOfAllMinNum[i]].data.source))) {
            visited.push(edgesToBeConsidered[indexesOfAllMinNum[i]].data.target)
            MinimumSpanningTree_Edges.push(edgesToBeConsidered[indexesOfAllMinNum[i]])
        } else {
            visited.push(edgesToBeConsidered[indexesOfAllMinNum[i]].data.target)
            MinimumSpanningTree_Edges.push(edgesToBeConsidered[indexesOfAllMinNum[i]])
        }
    }
    console.log(min)
    console.log(weightsToBeConsidered)

    console.log(edgesToBeConsidered)
    console.log(visited)
    console.log(MinimumSpanningTree_Edges)
}
/*
    while (visited.length !== props.nodes.length) {

    }
*/