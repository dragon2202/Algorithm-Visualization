import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
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
interface TreeProps {
    treeData: treeObject, 
    setTreeData: (value: any) => void, 
    setNodeList: (value: any) => void, 
    value: string, 
    setValue: (value: string) => void
}
//Preset Tree Data
const tree = [
    {},
    {
        name: '10',
        children: [
            {
                name: '7',
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
                name: '11',
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

const nodeList = [
    [],
    ["1", "6", "7", "8", "9", "10", "11", "20", "14", "22"],
    ["4", "10", "12", "15", "22", "18", "24", "25", "31", "35", "44", "50", "66", "70", "90"]
]

export default function Presets(props: TreeProps) {
    useEffect(() => {
        const num = parseInt(props.value)
        props.setTreeData(tree[num])
        props.setNodeList(nodeList[num])
    }, [props.value])
    return (
        <Box className="preset-box">
            <h4 className="header-4">Preset Binary Tree</h4>
            <FormControl fullWidth className="select-form">
                <InputLabel>
                    Preset Tree
                </InputLabel>
                <Select className='select' value={props.value} label="tree" onChange={(event: SelectChangeEvent) => props.setValue(event.target.value as string)}>
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>First</MenuItem>
                    <MenuItem value={2}>Second</MenuItem>
                </Select>
            </FormControl>
            <Algorithm treeData={props.treeData} setTreeData={props.setTreeData} />
        </Box>
    )
}

//https://www.youtube.com/watch?v=BHB0B1jFKQc