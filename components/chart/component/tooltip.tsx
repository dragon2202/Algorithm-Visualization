import Tooltip from '@mui/material/Tooltip'
import { hashtableText } from '../text/text'

const HashtableTooltip = () => {
    return (
        <Tooltip title={hashtableText} className="tooltip">
            <h4>HashTable Info</h4>
        </Tooltip>
    )
}

export { HashtableTooltip }