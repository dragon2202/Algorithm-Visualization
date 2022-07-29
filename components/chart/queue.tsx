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

const arraySize = 7 //enforces a size limit, js array don't have a space limit
const colors = ['rgba(75,192,192,1)', 'rgb(52, 86, 139)', 'rgb(255, 111, 97)', 'rgb(107, 91, 149)', 'rgb(136, 176, 75)', 'rgb(247, 202, 201)', 'rgb(146, 168, 209)']

//Push function adds an item to the top of the stack
function enqueue(dataSets: Array<any>, counter: number, setDataSets: (value: Array<any>) => void, setCounter: (value: number) => void) {
    if (dataSets.length === arraySize) {
        toast("No space left in the stack to push")
        return
    }
    const item = {
        label: "Item " + (dataSets.length + 1).toString(),
        backgroundColor: colors[counter],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [1]
    }
    setCounter(counter + 1)
    setDataSets([...dataSets, item])//sets all previous item in stack with item(new item) at the back of stack
    toast("Item " + (dataSets.length + 1).toString() + " has been placed on top of the stack")
}

export default function Queue() {
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
                <h3>Stack Operations</h3>
                <div className="button-text">
                    <ButtonGroup orientation="vertical" variant="contained" className="buttongroup">
                        <Button key="one" className="push" onClick={() => enqueue(dataSets, counter, setDataSets, setCounter)}>Push</Button>
                    </ButtonGroup>
                </div>
            </Box>
            <ToastContainer theme='dark' />
        </div>
    )
}