import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, Tooltip, CategoryScale, LinearScale, Title, BarElement } from 'chart.js'
Chart.register(Tooltip, CategoryScale, LinearScale, Title, BarElement)

import Card from '@mui/material/Card'

interface ChartProps {
    arrayLength: number,
    dataSets: Array<any>
}
//Chart component for hashtable
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
                                text: 'Hashtable',
                            },
                            legend: {
                                display: false,
                                position: 'top',
                                align: 'center',
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