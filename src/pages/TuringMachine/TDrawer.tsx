import {
    Box,
    Drawer, Input,
    Paper,
    styled,
    Table, TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow, TextField, Typography
} from "@mui/material";
import React, { useState } from "react";
import Latex from "react-latex-next";
import useSyles from "./Styles";
import SettingsInputComponentRoundedIcon from '@mui/icons-material/SettingsInputComponentRounded';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondaryContainer.main,
        color: theme.palette.onSecondaryContainer.main,
        border: theme.palette.outline.main,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const TDrawer = () => {

    const [drawerOpen, setDrawerOpen] = useState(true);

    const styles: any = useSyles().drawer;

    const [problemAlphabet, setProblemAlphabet] = useState<string[]>(["a", "b", "c", "first", "second"]);
    const [problemAlphabetValue, setProblemAlphabetValue] = useState<string>("a\nb\nc\nfirst\nsecond\nthird");

    const handleProblemAlphabetChange = (e: any) => {
        // setProblemAlphabetValue(problemAlphabetValue + e.nativeEvent.data);
        // return () => P
        setProblemAlphabetValue(e.target.value);

    }

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }

    const handleDawnerOpen = () => {
        setDrawerOpen(true);
    }

    const createState = (
        name: string
    ) => {

    }

    return <Box>
        <Drawer
            anchor="bottom"
            open={drawerOpen}
            PaperProps={{style: styles.drawer}}
            variant="temporary"
            onClose={handleDrawerToggle}
        >

            <Box sx={styles.options}>
                <Box>
                    <TextField
                        label="Problem alphabet"
                        rows={4}
                        multiline
                        variant="outlined"
                        value={problemAlphabetValue}
                        onChange={handleProblemAlphabetChange}
                        sx={{
                                marginBottom: "20px"
                        }}
                    />
                    <Typography variant="h4">
                        <Latex>
                            {`$A$=$\\{${
                                problemAlphabet.map((char) => {return "\\overline{"+char+"}"})
                            }\\}$`}
                        </Latex>
                    </Typography>
                </Box>
            </Box>
            <Box sx={styles.table}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                <StyledTableCell align="right">Calories</StyledTableCell>
                                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*{rows.map((row) => (*/}
                            {/*    <StyledTableRow key={row.name}>*/}
                            {/*        <StyledTableCell component="th" scope="row">*/}
                            {/*            {row.name}*/}
                            {/*        </StyledTableCell>*/}
                            {/*        <StyledTableCell align="right">{row.calories}</StyledTableCell>*/}
                            {/*        <StyledTableCell align="right">{row.fat}</StyledTableCell>*/}
                            {/*        <StyledTableCell align="right">{row.carbs}</StyledTableCell>*/}
                            {/*        <StyledTableCell align="right">{row.protein}</StyledTableCell>*/}
                            {/*    </StyledTableRow>*/}
                            {/*))}*/}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Drawer>
        <Box sx={styles.drawer_opener} onMouseOver={handleDawnerOpen}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", justifySelf: "center", alignSelf: "center"}}>
                Control panel <SettingsInputComponentRoundedIcon sx={{marginLeft: "10px"}} fontSize="large"/>
            </Box>
        </Box>
    </Box>
            
}


export default TDrawer;