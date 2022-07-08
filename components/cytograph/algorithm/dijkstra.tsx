import CytographProps from '../../props/cytograph_master_props'

export default function Dijkstra(props: CytographProps) {
    let unvisited = props.nodes.map(item => item.data.id)
    let visited: any = []
    let unvisitedDistance = []
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
                if (edgesConnected[j].data.source === startingNode) {
                    index = props.nodes.findIndex(item => item.data.id === edgesConnected[j].data.target)
                } else {
                    index = props.nodes.findIndex(item => item.data.id === edgesConnected[j].data.source)
                }
                if (distance[index] > edgesConnected[j].data.weight) {
                    distance[index] = parseInt(edgesConnected[j].data.weight)
                    previous[index] = parseInt(startingNode!)
                }
            }
            unvisitedDistance = distance.filter(item => item > 0)
        } else {
            const indexOfNodeUnvisited = unvisitedDistance.indexOf(Math.min.apply(null, unvisitedDistance))
            const node = unvisited[indexOfNodeUnvisited]
            const indexofNode = props.nodes.findIndex(item => item.data.id === node)
            //keep track of unvisited and visted nodes
            const edgesConnected = props.edges.filter((item: any) => (item.data.source === node || item.data.target === node) && !((visited.includes(item.data.source) || (visited.includes(item.data.target)))))

            for (let j = 0; j < edgesConnected.length; j++) {
                if (edgesConnected[j].data.source === node) {
                    index = props.nodes.findIndex(item => item.data.id === edgesConnected[j].data.target)
                } else {
                    index = props.nodes.findIndex(item => item.data.id === edgesConnected[j].data.source)
                }
                if (parseInt(distance[index]) > (parseInt(edgesConnected[j].data.weight) + parseInt(distance[indexofNode]))) {
                    distance[index] = parseInt(edgesConnected[j].data.weight) + parseInt(distance[indexofNode])
                    previous[index] = parseInt(node!)
                }
            }
            unvisited.splice(indexOfNodeUnvisited, 1)
            visited.push(node)
            unvisitedDistance = [...distance]//shallow copy distance to update unvisited distance array
            let indexArray = []//stores all indexes of visited elements
            //finds all indexes visited nodes from passed node. They are one to one in indexes
            //prop.nodes[i] === distance[i] === previous[i]
            for (let k = 0; k < visited.length; k++) {
                indexArray.push(props.nodes.findIndex(item => item.data.id === visited[k]))
            }
            indexArray.sort(function (a, b) { return b - a })//sort in reverse order, biggest num first, smallest num last
            for (let l = 0; l < indexArray.length; l++) {//remove distances that are visited
                unvisitedDistance.splice(indexArray[l], 1);
            }
        }
    }
    props.setDistance(distance)
    props.setPrevious(previous)
}

// store all previous edges
// create a dijkstra tree of distance and previous

//https://gist.github.com/Prottoy2938/66849e04b0bac459606059f5f9f3aa1a

//https://www.youtube.com/watch?v=K_1urzWrzLs
//https://www.programiz.com/dsa/dijkstra-algorithm
//https://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript