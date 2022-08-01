import {useState} from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const options = [
  'None',
  'Atria'
];

const ITEM_HEIGHT = 48;

export default function Navigation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
    return (
        <div role="presentation" style={{ display: "table", margin: '0 auto' }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={"/"}>
                    Home
                </Link>
                <Link underline="hover" color="inherit" href={"/graph"}>
                    Graph
                </Link>
                <Link underline="hover" color="inherit" href={"#"} onMouseOver={(event: any) => setAnchorEl(event.currentTarget)}>
                    Data Structures
                </Link>
                <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl} sx={{marginTop: '2px'}}>
                    {options.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => setAnchorEl(null)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Breadcrumbs>
        </div>
    )
}

//https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/