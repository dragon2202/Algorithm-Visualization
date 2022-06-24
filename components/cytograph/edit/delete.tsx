import CytographPropsEdit from '../../props/cytograph_edit_props'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { FormControl } from '@mui/material'

export default function CytographEditDelete(props: CytographPropsEdit) {
    return (
        <div className="cytograph-edit-delete">
            <Box className="form">
                <h2>Delete Node/Edge</h2>
                <form>
                    <FormControl fullWidth className="node">
                        <InputLabel>Node</InputLabel>
                        <Select label="node" name="nodeSelect" defaultValue={''}>
                            <MenuItem value={''} key={0}>None</MenuItem>
                            {
                                props.nodes.map((item) => {
                                    return (
                                        <MenuItem value={item.data.id} key={item.data.id}>
                                            {item.data.label}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <Button variant="contained" className="button" type="submit">Add Edge</Button>
                    </FormControl>
                </form>
            </Box>
        </div>
    )
}