import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, Tooltip, CategoryScale, LinearScale, Title, BarElement } from 'chart.js'
Chart.register(Tooltip, CategoryScale, LinearScale, Title, BarElement)

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ToastContainer, toast } from 'react-toastify'
import HashtableChart from './component/hashtable-chart'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import { HashtableTooltip } from './component/tooltip'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const arrayLength = 7//bucket size

///table[i][j][k]
//i is the 7 buckets
//j is array within buckets that store items assigned by hash and items that collided
//k is the array that stores keys and values

interface KeyValue {
    key: string
    value: any
}

export default function HashtableComponent() {
    const [setValue, setSetValue] = useState<KeyValue>({key: "", value: ""})
    const [getValue, setGetValue] = useState<string>("")
    const [deleteValue, setDeleteValue] = useState<string>("")
    const [table, setTable] = useState<Array<any>>(new Array(arrayLength))
    const [dataSets, setDataSets] = useState<Array<any>>([])
    const [open, setOpen] = useState(false)
    
    //Generate a hashkey for the hashtable
    function hash(key: string) {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % arrayLength
    }
    //Function pushes an item to an array for the chart
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
    //Function pushes an item to an array for the chart
    function updateHashTable(key: string, value: any) {
        const newArray = [...dataSets]
        const indexOfItem = newArray.findIndex((item) => item.key === key)
        newArray[indexOfItem].value = value
        newArray[indexOfItem].label = "[Key: " + key + ", Value: " + value.toString() + "]"
        setDataSets(newArray)
    }

    //Function removes an item to an array for the chart
    function removeHashTable(key: string) {
        //removes item where key matches passed value, and gives a shallow copy array where the item is already removed
        setDataSets(dataSets.filter((item) => item.key !== key))
    }
    //Function sets a key and value to hashtable, updates if it key already exists
    function set(key: string, value: any) {
        const index = hash(key)
        if (table[index] !== undefined) {
            for (let i = 0; i < table[index].length; i++) {
                //Find key/value pair in the chain
                if (table[index][i][0] === key) {
                    //If key is the same, just replace instead of chaining
                    table[index][i][1] = value
                    updateHashTable(key, value)
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
    //Gets item from the hashtable with provided key
    function get(key: string) {
        const index = hash(key)
        if (table[index]) {
            for (let i = 0; i < table[index].length; i++) {
                if (table[index][i][0] === key) {
                    toast("Item with the key: " + key + " has a value of " + table[index][i][1] + ". This item is located in bucket " + (index + 1) + ", it's placement is " + (i + 1) + " looking from the left")
                    return
                    //return table[index][i][1]
                }
            }
        }
        toast("No item in the hashtable has this key")
        return
        //return undefined
    }
    //Removes item from hashtable with provided key
    function remove(key: string) {
        const index = hash(key)
        //check if table[index] is truthy and table[index] is not zero in length
        if (table[index] && table[index].length) {
            for (let i = 0; i < table.length; i++) {
                if (table[index][i][0] === key) {
                    table[index].splice(i, 1)
                    removeHashTable(key)
                    //return true
                }
            }
        } else {
            toast("No item in the hashtable has this key")
            //return false
        }
    }
    //Removes all items from hashtable
    function removeAll() {
        setTable(new Array(arrayLength))
        setDataSets([])
    }

    return (
        <div>
            <HashtableChart arrayLength={arrayLength} dataSets={dataSets} />
                <HashtableTooltip/>
            <div className="functions">
                <Box className="box">
                    <form onSubmit={(event) => { event.preventDefault(); set(setValue.key, setValue.value)}} className="setForm">
                        <h4 className='header'>Enter key and value to insert/update an item to the hashtable</h4>
                        <TextField required={true} name="Enter key" label="Key" variant="standard" className="key" onChange={(event) => setSetValue(prev => ({...prev, key: event.target.value}))}/>
                        <TextField required={true} name="Enter value" label="Value" variant="standard" className="value" onChange={(event) => setSetValue(prev => ({...prev, value: event.target.value}))}/>
                        <Button type="submit" variant="outlined" className="button">Submit</Button>
                    </form>
                    <form onSubmit={(event) => { event.preventDefault(); get(getValue)}} className="getForm">
                        <h4 className='header'>Enter key to get it's value from the hashtable</h4>
                        <TextField name="get" label="Enter key" variant="standard" className="get" onChange={(event) => setGetValue(event.target.value)}/>
                        <Button type="submit" variant="outlined" className="button">Submit</Button>
                    </form>
                    <form onSubmit={(event) => { event.preventDefault(); remove(deleteValue)}} className="deleteForm">
                        <h4 className='header'>Enter key to delete item from the hashtable</h4>
                        <TextField name="delete" label="Enter key" variant="standard" className="delete" onChange={(event) => setDeleteValue(event.target.value)}/>
                        <Button type="submit" variant="outlined" className="button">Submit</Button>
                    </form>
                    <form onSubmit={(event) => { event.preventDefault(); setOpen(true)}} className="deleteAllForm">
                        <h4 className='header'>Remove all items in hashtable</h4>
                        <Button type="submit" variant="outlined" className="button">Submit</Button>
                    </form>
                </Box>

                <ToastContainer theme='dark' autoClose={10000}/>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Remove all items
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Are you sure you want to delete all items in the hashtable?
                        </Typography>
                        <Button variant="contained" type="submit" onClick={() => {removeAll(); setOpen(false)}} sx={{marginTop: '12px'}}>
                            Delete
                        </Button>
                    </Box>
                </Modal>
            </div>
        </div>

    )
}

//https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object