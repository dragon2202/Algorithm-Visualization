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
import { stackText } from './text/stack-text'

const arraySize = 7 //enforces a size limit, js array don't have a space limit

//Push function adds an item to the top of the stack
function pushToStack(dataSets: Array<any>, setDataSets: (value: Array<any>) => void) {
    if (dataSets.length === arraySize) {
        toast("No space left in the stack to push")
        return
    }
    const item = {
        label: "Item " + (dataSets.length + 1).toString(),
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [1]
    }
    setDataSets([...dataSets, item])//sets all previous item in stack with item(new item) at the back of stack
    toast("Item " + (dataSets.length + 1).toString() + " has been placed on top of the stack")
}
//Pop function removes the item at the top (newest item) of the stack and returns it. In this example it just notifies the user.
function popStack(dataSets: Array<any>, setDataSets: (value: any) => void) {
    if (dataSets.length === 0) {
        toast("No item in the stack left to pop")
        return
    }
    const newDataSets = [...dataSets]//shallow copies the stack
    const pop = newDataSets.pop()//removes item at the end, which is the top of the stack
    toast(pop.label + " has been removed from the top of the stack")
    setDataSets(newDataSets)
}
//Peek function gets value of the top of the stack without removing it.
function peekStack(dataSets: Array<any>) {
    if (dataSets.length === 0) {
        toast("No item in the stack")
        return
    }
    toast(dataSets[dataSets.length - 1].label + " is at the top of the stack")
}

//isFull function checks if stack is full.
function isFull(dataSets: Array<any>) {
    if (dataSets.length === arraySize) {
        toast("Stack is full")
        return
    }
    toast("Stack still has space for " + (arraySize - dataSets.length) + " item(s)")
}
//isEmpty function checks if stack is empty
function isEmpty(dataSets: Array<any>) {
    if (dataSets.length === 0) {
        toast("Stack is empty")
        return
    }
    toast("Stack is not empty, it has " + dataSets.length + " item(s) in the stack")
}

export default function Stack() {
    const [toggle, setToggle] = useState<boolean>(false)
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
        <div className="stack">
            <Card>
                <Bar 
                    className='bar'
                    data={{ labels: ['Stack'], datasets: [...dataSets] }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Stack',
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
                <h3>Stack Operations</h3>
                <div className="button-text">
                    <ButtonGroup orientation="vertical" variant="contained" className="buttongroup">
                        <Button key="one" className="push" onClick={() => pushToStack(dataSets, setDataSets)}>Push</Button>
                        <Button key="two" className="pop" onClick={() => popStack(dataSets, setDataSets)}>Pop</Button>
                        <Button key="three" className="peek" onClick={() => peekStack(dataSets)}>Peek</Button>
                        <Button key="four" className="isFull" onClick={() => isFull(dataSets)}>Is Full</Button>
                        <Button key="five" className="isEmpty" onClick={() => isEmpty(dataSets)}>Is Empty</Button>
                    </ButtonGroup>
                    <Card className="text">
                        <CardContent>
                            {
                                (toggle === false) ? 
                                    stackText
                                :
                                <Typography variant="body1" className="typo">
                                    <b>Push</b>: Add an element to the top of a stack
                                    <br/>
                                    <b>Pop</b>: Remove an element from the top of a stack
                                    <br/>
                                    <b>Peek</b>: Get the value of the top element without removing it
                                    <br/>
                                    <b>is Full</b>: Check if the stack is full
                                    <br/>
                                    <b>is Empty</b>: Check if the stack is empty
                                </Typography>
                            }
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => setToggle(!toggle)}>{(toggle === false) ? "Function Info" : "Stack Info"}</Button>
                            <Button size="small" onClick={() => window.open("https://www.programiz.com/dsa/stack", '_blank', 'noopener,noreferrer')}>More Info</Button>
                        </CardActions>
                    </Card>
                </div>
            </Box>
            <ToastContainer theme='dark' />
        </div>
    )
}