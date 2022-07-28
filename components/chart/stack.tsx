import { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, Tooltip, CategoryScale, LinearScale, Title, BarElement } from 'chart.js';
Chart.register(Tooltip, CategoryScale, LinearScale, Title, BarElement)

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { ToastContainer, toast } from 'react-toastify';

function pushToStack(dataSets: Array<any>, setDataSets: (value: Array<any>) => void, setOpen: (value: boolean) => void, toast: (value: any) => void) {
    const item = {
        label: "Item " + (dataSets.length + 1).toString(),
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: [1]
    }
    setDataSets([...dataSets, item])
    toast("Item " + (dataSets.length + 1).toString() + " has been placed on the stack")
}

function popStack(dataSets: Array<any>, setDataSets: (value: any) => void) {
    const newDataSets = [...dataSets]
    newDataSets.pop()
    setDataSets(newDataSets)
}

export default function Stack() {
    const [open, setOpen] = useState<boolean>(false)
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
                <Bar data={{ labels: ['Stack'], datasets: [...dataSets] }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Items in a Stack',
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
                <ButtonGroup orientation="vertical" variant="contained" className="buttongroup">
                    <Button key="one" className="push" onClick={() => pushToStack(dataSets, setDataSets, setOpen, toast)}>Push</Button>
                    <Button key="two" className="pop" onClick={() => popStack(dataSets, setDataSets)}>Pop</Button>
                    <Button key="three" className="peek">Peek</Button>
                </ButtonGroup>
            </Box>
            <ToastContainer />
        </div>
    )
}