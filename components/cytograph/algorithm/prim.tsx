import CytographProps from '../../props/cytograph_master_props'

export default function Prim (props: CytographProps) {
    let visited: any = []//keep track of visited nodes to prevent cycles
    visited.push(props.nodes[0].data.id)
    let MinimumSpanningTree_Edges: any = []
    for (let i = 0; i < 3; i++) {
        let edgesToBeConsidered: any = []
        for (let j = 0; j < visited.length; j++) {
            const edgesConnected = props.edges.filter((item: any) => item.data.source === visited[j] || item.data.target === visited[j])
            edgesToBeConsidered.push(...edgesConnected)
        }
        //removes duplicates. For example if a connects to b. next run b gets all connected nodes including a, there will be two a to b connections
        edgesToBeConsidered = Array.from(new Set(edgesToBeConsidered))
        //removes edges that are already added to the minimum tree, and removes it from consideration.
        edgesToBeConsidered = edgesToBeConsidered.filter((val: any) => !MinimumSpanningTree_Edges.includes(val))

        const weightsToBeConsidered = edgesToBeConsidered.map((item: any) => parseInt(item.data.weight))
        const min = Math.min.apply(null, weightsToBeConsidered)

        const indexesOfAllMinNum = []
        for (let i = 0; i < weightsToBeConsidered.length; i++) {
            if(weightsToBeConsidered[i] === min) {
                indexesOfAllMinNum.push(i)
            }
        }

        for (let i = 0; i < indexesOfAllMinNum.length; i++) {
            if(visited.includes((edgesToBeConsidered[indexesOfAllMinNum[i]].data.source))) {
                visited.push(edgesToBeConsidered[indexesOfAllMinNum[i]].data.target)
                MinimumSpanningTree_Edges.push(edgesToBeConsidered[indexesOfAllMinNum[i]])
            } else {
                visited.push(edgesToBeConsidered[indexesOfAllMinNum[i]].data.source)
                MinimumSpanningTree_Edges.push(edgesToBeConsidered[indexesOfAllMinNum[i]])
            }
        }
    }
    console.log(MinimumSpanningTree_Edges)

}