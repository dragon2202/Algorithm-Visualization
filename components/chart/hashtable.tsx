import { useState } from 'react'
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

export default function HashtableComponent() {
    const [table, setTable] = useState<Array<any>>(new Array(arrayLength))
    const [size, setSize] = useState<number>(0)

    function hash(key: string) {
        let hash = 0
        for (let i = 0; i< key.length; i++){
            hash += key.charCodeAt(i)
        }
        return hash % arrayLength
    }

    function set(key: string, value: any) {
        const index = hash(key)
        if(table[index] !== undefined) {
            for(let i = 0; i < table[index].length; i++) {
                //Find key/value pair in the chain
                if(table[index][i][0] === key){
                    table[index][i][1] = value
                    return
                }
            }
            //not found, push a new key/value pair
            table[index].push([key, value])
        } else {
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
        set("ǻ", 192)
    }
    function test2() {
        console.log(get("Spain"))
        console.log(get("ǻ"))
    }

    return (
        <div className="buttongroup">
            <ButtonGroup orientation="vertical" variant="contained" className="buttongroup">
                <Button key="one" className="enqueue" onClick={() => console.log(table)}>Print</Button>
                <Button key="two" className="enqueue" onClick={() => set('1', 'Fart')}>Set</Button>
                <Button key="three" className="enqueue" onClick={() => test()}>Test</Button>
                <Button key="four" className="enqueue" onClick={() => test2()}>Test2</Button>
            </ButtonGroup>
        </div>
    )
}