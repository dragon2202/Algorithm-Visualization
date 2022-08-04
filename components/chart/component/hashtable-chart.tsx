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

interface ChartProps {
    arrayLength: number,
    dataSets: Array<any>
}

export default function HashtableChart(props: ChartProps) {
    const [labels, setLabels] = useState<Array<string>>([])
    useEffect(()=> {
        const array: Array<string> = []
        for(let i = 0; i < props.arrayLength; i++) {
            const label = "Bucket " + (i + 1)
            array.push(label)
        }
        setLabels(array)
    },[])
    return(
        <div>
            <Card className="card">
                <Bar 
                    className="bar"
                    data={{ labels: labels, datasets: [...props.dataSets] }}
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
        </div>
    )
}