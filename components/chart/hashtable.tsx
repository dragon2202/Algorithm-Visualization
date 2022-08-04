import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, Tooltip, CategoryScale, LinearScale, Title, BarElement } from 'chart.js'
Chart.register(Tooltip, CategoryScale, LinearScale, Title, BarElement)

import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { ToastContainer, toast } from 'react-toastify'
import { queueText } from './text/queue-text'
import HashtableChart from './component/hashtable-chart'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

const arrayLength = 7//bucket size

///table[i][j][k]
//i is the 7 buckets
//j is array within buckets that store items assigned by hash and items that collided
//k is the array that stores keys and values

export default function HashtableComponent() {
    const [hashTableSet, setHashTableSet] = useState<Object>({key: "", value: ""})
    const [table, setTable] = useState<Array<any>>(new Array(arrayLength))
    const [dataSets, setDataSets] = useState<Array<any>>([])

    const handleChange = (item: any) => {
        const { key, value } = item;
        setHashTableSet(prevState => ({
            ...prevState,
            [key]: value
        }));
        console.log(key)
        console.log(value)
    }

    function hash(key: string) {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % arrayLength
    }

    function setHashTable(index: number, key: string, value: any) {
        const array = Array(index + 1).fill(0)
        array[index] = 1
        const item = {
            key: key,
            value: value,
            label: "[Key: " + key + ", Value: " + value.toString() + "]",
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: array
        }
        setDataSets(oldArray => [...oldArray, item])
    }

    function removeHashTable(key: string) {
        setDataSets(dataSets.filter((item) => item.key !== key))
    }

    function set(key: string, value: any) {
        const index = hash(key)
        if (table[index] !== undefined) {
            for (let i = 0; i < table[index].length; i++) {
                //Find key/value pair in the chain
                if (table[index][i][0] === key) {
                    //If key is the same, just replace instead of chaining
                    table[index][i][1] = value
                    return
                }
            }
            //not found, push a new key/value pair
            table[index].push([key, value])
            setHashTable(index, key, value)
        } else {
            table[index] = []
            table[index].push([key, value])
            setHashTable(index, key, value)
        }
        /*
        table[index] = [key, value]
        */
    }

    function get(key: string) {
        const index = hash(key)
        if (table[index]) {
            for (let i = 0; i < table.length; i++) {
                if (table[index][i][0] === key) {
                    return table[index][i][1]
                }
            }
        }
        return undefined
    }

    function remove(key: string) {
        const index = hash(key)
        //check if table[index] is truthy and table[index] is not zero in length
        if (table[index] && table[index].length) {
            for (let i = 0; i < table.length; i++) {
                if (table[index][i][0] === key) {
                    table[index].splice(i, 1)
                    removeHashTable(key)
                    return true
                }
            }
        } else {
            return false
        }
    }

    function test() {
        set("Spain", 110)
        set("ǻ", 192)
    }
    function test2() {
        console.log(dataSets)
        console.log(table)
    }

    /* 
      <form onSubmit={handleControlledSubmit} className={classes.form}>
        <TextField
          name="controlled-field"
          label="Controlled field"
          fullWidth
          value={values["controlled-field"] || ""}
          onChange={handleChange}
        />

        <Button type="submit" variant="outlined" className={classes.button}>
          Submit
        </Button>
      </form>
    */
    return (
        <div>
            <HashtableChart arrayLength={arrayLength} dataSets={dataSets} />
            <div className="functions">
                <Box className="box">
                    <form onSubmit={(event) => { event.preventDefault(); console.log(hashTableSet)}} className="setForm">
                        <TextField name="key" label="Key" variant="standard" className="key" onChange={(event) => setHashTableSet(prev => ({...prev, key: event.target.value}))}/>
                        <TextField name="value" label="Value" variant="standard" className="value" onChange={(event) => setHashTableSet(prev => ({...prev, key: event.target.value}))}/>
                        <Button type="submit" variant="outlined" className="button">Submit</Button>
                    </form>
                </Box>
            </div>
        </div>

    )
}

/*

                    <TextField
                        id="outlined-name"
                        label="Name"
                        value="Placeholder"
                    />
                    <ButtonGroup orientation="vertical" variant="contained">
                        <Button key="one" className="enqueue" onClick={() => console.log(table)}>Print</Button>
                        <Button key="two" className="enqueue" onClick={() => test()}>Set</Button>
                        <Button key="three" className="enqueue" onClick={() => test2()}>Test</Button>
                        <Button key="four" className="enqueue" onClick={() => remove('Spain')}>Test2</Button>
                    </ButtonGroup>
*/

//https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object