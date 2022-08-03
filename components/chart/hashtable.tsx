import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, Tooltip, CategoryScale, LinearScale, Title, BarElement } from 'chart.js'
Chart.register(Tooltip, CategoryScale, LinearScale, Title, BarElement)

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import { ToastContainer, toast } from 'react-toastify'
import { queueText } from './text/queue-text'

const arrayLength = 7//bucket size

///table[i][j][k]
//i is the 7 buckets
//j is array within buckets that store items assigned by hash and items that collided
//k is the array that stores keys and values

export default function HashtableComponent() {
    const [table, setTable] = useState<Array<any>>(new Array(arrayLength))
    const [labels, setLabels] = useState<Array<string>>([])
    const [size, setSize] = useState<number>(0)
    const [dataSets, setDataSets] = useState<Array<any>>([])

    useEffect(()=> {
        const array: Array<string> = []
        for(let i = 0; i < arrayLength; i++) {
            const label = "Bucket " + (i + 1)
            array.push(label)
        }
        setLabels(array)
    },[])
    
    function hash(key: string) {
        let hash = 0
        for (let i = 0; i< key.length; i++){
            hash += key.charCodeAt(i)
        }
        return hash % arrayLength
    }

    function setHashTable(key: string, value: any){
        const array = Array(arrayLength).fill(0)
        array[dataSets.length % arrayLength] = 1
        const item = {
            label: "Item " + (dataSets.length + 1),
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: array
        }
        setDataSets([...dataSets, item])
    }

    function set(key: string, value: any) {
        const index = hash(key)
        if(table[index] !== undefined) {
            for(let i = 0; i < table[index].length; i++) {
                //Find key/value pair in the chain
                console.log('inside')
                if(table[index][i][0] === key){
                    table[index][i][1] = value
                    return
                }
            }
            console.log('outside')
            //not found, push a new key/value pair
            table[index].push([key, value])
        } else {
            console.log('else')
            table[index] = []
            table[index].push([key, value])
        }
        /*
        table[index] = [key, value]
        setSize(size + 1)
        */
    }

    function get(key: string) {
        const index = hash(key)
        return table[index]
    }

    function remove(key: string) {
        const index = hash(key)
        //check if table[index] is truthy and table[index] is not zero in length
        if(table[index] && table[index].length){
            table[index] = undefined
            setSize(size - 1)
            return true
        } else {
            return false
        }
    }

    function test() {
        set("Spain", 110)
        console.log(get('Spain'))
        //set("Spain", 110)
        //set("ǻ", 192)
    }
    function test2() {
        console.log(table)
        console.log(table[3][0][0])
        console.log(table[3][0][1])
    }

    return (
        <div>
            <Card className="card">
                <Bar 
                    className="bar"
                    data={{ labels: labels, datasets: [...dataSets] }}
                    options={{
                        indexAxis: 'y',
                        plugins: {
                            title: {
                                display: true,
                                text: 'Items in a Queue',
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },

                        },
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                    }}
                />
            </Card>
            <div className="buttongroup">
                <ButtonGroup orientation="vertical" variant="contained" className="buttongroup">
                    <Button key="one" className="enqueue" onClick={() => console.log(table)}>Print</Button>
                    <Button key="two" className="enqueue" onClick={() => set('1', 'Fart')}>Set</Button>
                    <Button key="three" className="enqueue" onClick={() => test()}>Test</Button>
                    <Button key="four" className="enqueue" onClick={() => test2()}>Test2</Button>
                </ButtonGroup>
            </div>
        </div>

    )
}