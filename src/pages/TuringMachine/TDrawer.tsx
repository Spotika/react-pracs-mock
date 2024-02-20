import { Box, Drawer} from "@mui/material";
import { useState } from "react";
import useSyles from "./Styles";
import SettingsInputComponentRoundedIcon from '@mui/icons-material/SettingsInputComponentRounded';


const TDrawer = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const styles: any = useSyles().drawer;

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }

    const handleDawnerOpen = () => {
        setDrawerOpen(true);
    }

    return <Box>
        <Drawer
            anchor="bottom"
            open={drawerOpen}
            PaperProps={{style: styles.drawer}}
            variant="temporary"
            onClose={handleDrawerToggle}
        >
            {/* here drawer */}
        </Drawer>
        <Box sx={styles.drawer_opener} onMouseOver={handleDawnerOpen}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", justifySelf: "center", alignSelf: "center"}}>
                Control panel <SettingsInputComponentRoundedIcon sx={{marginLeft: "10px"}} fontSize="large"/>
            </Box>
        </Box>
    </Box>
            
}


export default TDrawer;