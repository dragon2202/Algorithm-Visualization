import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function Navigation() {
    return (
        <div role="presentation" style={{ display: "table", margin: '0 auto' }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={"/"}>
                    Home
                </Link>
                <Link underline="hover" color="inherit" href={"/graph"}>
                    Graph
                </Link>
            </Breadcrumbs>
        </div>
    )
}