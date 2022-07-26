import { Bar } from 'react-chartjs-2';
import { Chart, Tooltip, CategoryScale, LinearScale, Title, BarElement } from 'chart.js';
Chart.register(Tooltip, CategoryScale, LinearScale, Title, BarElement)

const state = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
}

export default function Stack() {
    return (
        <div>
            <Bar 
                data={state} 
                options={{
                    plugins: {
                        title:{
                            display:true,
                            text:'Average Rainfall per month',
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }
                }}
            />
        </div>
    )
}