import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme
} from '@mui/material/styles'
import { Box } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }
  return (
    <div>
      <FormControl size='small' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="mode-select-light-darklabel" sx={{
          color: 'white', '&.Mui-focused': { color: 'white' }
        }} >Mode</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="mode-select-light-darklabel"
          value={mode}
          label="Mode"
          onChange={handleChange}
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '&:hover .MuiOutlinedInput-notchedOutline': { color: 'white', borderColor: 'white' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '.MuiSvgIcon-root': { color: 'white' }
          }}

        >
          <MenuItem value='light'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><LightModeIcon fontSize='small'/>Light</Box>
          </MenuItem>
          <MenuItem value='dark'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><DarkModeIcon fontSize='small'/>Dark</Box>
          </MenuItem>
          <MenuItem value='system'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><SettingsIcon fontSize='small'/>System</Box>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default ModeSelect
