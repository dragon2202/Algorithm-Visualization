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

const arraySize = 7 //enforces a size limit, js array don't have a space limit
const colors = ['rgba(75,192,192,1)', 'rgb(52, 86, 139)', 'rgb(255, 111, 97)', 'rgb(107, 91, 149)', 'rgb(136, 176, 75)', 'rgb(247, 202, 201)', 'rgb(146, 168, 209)']

//Push function adds an item to the top of the stack
function enqueue(dataSets: Array<any>, counter: number, setDataSets: (value: Array<any>) => void, setCounter: (value: number) => void) {
    if (dataSets.length === arraySize) {
        toast("No space left in the stack to push")
        return
    }
    const item = {
        label: "Item " + (counter + 1).toString(),
        backgroundColor: colors[(counter + 1) % arraySize],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [1]
    }
    setCounter(counter + 1)
    setDataSets([...dataSets, item])//sets all previous item in stack with item(new item) at the back of stack
    toast("Item " + (counter + 1).toString() + " has been placed on top of the stack")
}

function dequeue(dataSets: Array<any>, setDataSets: (value: Array<any>) => void) {
    if (dataSets.length === 0) {
        toast("No items in the queue to dequeue")
        return
    }
    const newDataSets = [...dataSets]//shallow copies the stack
    const shift = newDataSets.shift()//removes item at the end, which is the top of the stack
    toast(shift.label + " has been dequeued from the front of the queue")
    setDataSets(newDataSets)
}
//Peek function gets value of the first item in queue without removing it.
function peekQueue(dataSets: Array<any>) {
    if (dataSets.length === 0) {
        toast("No item in the queue")
        return
    }
    toast(dataSets[0].label + " is the first item in the queue")
}
//isFull function checks if queue is full.
function isFull(dataSets: Array<any>) {
    if (dataSets.length === arraySize) {
        toast("Queue is full")
        return
    }
    toast("Queue still has space for " + (arraySize - dataSets.length) + " item(s)")
}
//isEmpty function checks if queue is empty
function isEmpty(dataSets: Array<any>) {
    if (dataSets.length === 0) {
        toast("Queue is empty")
        return
    }
    toast("Queue is not empty, it has " + dataSets.length + " item(s) in the stack")
}

export default function Queue() {
    const [toggle, setToggle] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(1)
    const [dataSets, setDataSets] = useState<Array<any>>([
        {
            label: 'Item 1',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: [1]
        }
    ])
    return (
        <div className="queue">
            <Card >
                <Bar 
                    className="bar"
                    data={{ labels: ['Queue'], datasets: [...dataSets] }}
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
            
            <Box textAlign='center'>
                <h3>Queue Operations</h3>
                <div className="button-text">
                    <ButtonGroup orientation="vertical" variant="contained" className="buttongroup">
                        <Button key="one" className="enqueue" onClick={() => enqueue(dataSets, counter, setDataSets, setCounter)}>Enqueue</Button>
                        <Button key="two" className="dequeue" onClick={() => dequeue(dataSets, setDataSets)}>Dequeue</Button>
                        <Button key="three" className="peek" onClick={() => peekQueue(dataSets)}>Peek</Button>
                        <Button key="four" className="isFull" onClick={() => isFull(dataSets)}>Is Full</Button>
                        <Button key="five" className="isEmpty" onClick={() => isEmpty(dataSets)}>Is Empty</Button>
                    </ButtonGroup>
                    <Card className="text">
                        <CardContent>
                            {
                                (toggle === false) ? 
                                    queueText
                                :
                                <Typography variant="body1" className="typo">
                                    <b>Enqueue</b>: Add an element to the end of the queue
                                    <br/>
                                    <b>Dequeue</b>: Remove an element from the front of the queue
                                    <br/>
                                    <b>Peek</b>: Get the value of the front of the queue without removing it
                                    <br/>
                                    <b>is Full</b>: Check if the queue is full
                                    <br/>
                                    <b>is Empty</b>: Check if the queue is empty
                                </Typography>
                            }
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => setToggle(!toggle)}>{(toggle === false) ? "Function Info" : "Stack Info"}</Button>
                            <Button size="small" onClick={() => window.open("https://www.programiz.com/dsa/queue", '_blank', 'noopener,noreferrer')}>More Info</Button>
                        </CardActions>
                    </Card>
                </div>
            </Box>
            <ToastContainer theme='dark' />
        </div>
    )
}