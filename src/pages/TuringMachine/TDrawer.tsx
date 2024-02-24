import React, {FC, useState} from "react";
import useStyles from "./Styles.tsx";
import {Box, Drawer} from "@mui/material";
import SettingsInputComponentRoundedIcon from "@mui/icons-material/SettingsInputComponentRounded";


type Props = {
    children?: React.ReactNode
};
const TDrawer: FC<Props> = ({children}) => {

    const styles: any = useStyles().drawer;
    const [drawerOpen, setDrawerOpen] = useState(true);

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
            {children}
        </Drawer>
        <Box sx={styles.drawer_opener} onMouseOver={handleDawnerOpen}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifySelf: "center",
                alignSelf: "center"
            }}>
                Control panel <SettingsInputComponentRoundedIcon sx={{marginLeft: "10px"}} fontSize="medium"/>
            </Box>
        </Box>
    </Box>
}

export default TDrawer