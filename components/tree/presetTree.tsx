import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { FormControl } from '@mui/material'

import Algorithm from './algorithm'

//Defined Tree Object
interface treeObject {
    name: string,
    children: Array<any>
}
//Defined Tree Props passed to this component
interface Tree {
    treeData: treeObject
    setTreeData: (value: any) => void
}
//Preset Tree Data
const tree = [
    {},
    {
        name: '10',
        children: [
            {
                name:'7',
                children: [
                    {
                        name: '6',
                        children: [
                            {
                                name: '1',
                                children: []
                            },
                            {}
                        ]
                    },
                    {
                        name: '8',
                        children: [
                            {},
                            {
                                name: '9',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                name:'11',
                children: [
                    {},
                    {
                        name: '20',
                        children: [
                            {
                                name: '14',
                                children: []
                            },
                            {
                                name: '22',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: '25',
        children: [
            {
                name: '15',
                children: [
                    {
                        name: '10',
                        children: [
                            {
                                name: '4',
                                children: []
                            },
                            {
                                name: '12',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '22',
                        children: [
                            {
                                name: '18',
                                children: []
                            },
                            {
                                name: '24',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '50',
                children: [
                    {
                        name: '35',
                        children: [
                            {
                                name: '31',
                                children: []
                            },
                            {
                                name: '44',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '70',
                        children: [
                            {
                                name: '66',
                                children: []
                            },
                            {
                                name: '90',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export default function Presets(props: Tree) {
    const [value, setValue] = useState<string>('0')
    useEffect(() => {
        const num = parseInt(value)
        props.setTreeData(tree[num])
    },[value])
    return (
        <div className="preset-tree">
            <Card className="card"> 
                <CardContent>
                    <Box className="box">
                        <h4 className="header-4">Preset Binary</h4>
                        <FormControl fullWidth className="select-form">
                            <InputLabel>
                                Preset
                            </InputLabel>
                            <Select className='select' value={value} label="tree" onChange={(event: SelectChangeEvent) => setValue(event.target.value as string)}>
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>First</MenuItem>
                                <MenuItem value={2}>Second</MenuItem>
                            </Select>
                        </FormControl>
                        <Algorithm treeData={props.treeData} setTreeData={props.setTreeData}/>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

//https://www.youtube.com/watch?v=BHB0B1jFKQc