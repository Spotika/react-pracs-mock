import {
    Box,
    Drawer,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import Latex from "react-latex-next";
import useStyles from "./Styles";
import SettingsInputComponentRoundedIcon from '@mui/icons-material/SettingsInputComponentRounded';

function removeDuplicates(arr: string[]): string[] {
    return arr.reduce(function (acc: any, curr: any) {
        if (!acc.includes(curr))
            acc.push(curr);
        return acc;
    }, []);
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondaryContainer.main,
        color: theme.palette.onSecondaryContainer.main,
        border: theme.palette.outline.main,
        fontSize: 30,
        padding: 20,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20
    },
    // [`&.${tableCellClasses.body}:hover`]: {
    //     fontSize: 20,
    //     backgroundColor: "white"
    // },
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

type configurationType = {
    cross: boolean,
    first: null | string,
    second: null | "left" | "right",
    third: null | string,
    char: string
    // char: string
}

type stateType = {
    name: string,
    configurations: configurationType[],
    id: number
}


// class ConfigurationTableCell(React.Component) {
//
//     row_id: number;
//     col_id:number;
//
//     constructor() {
//
//     }
//
//     render() {
//
//         return <>
//         </>
//     }
//
// }


const TDrawerDeprecated = () => {

    const [drawerOpen, setDrawerOpen] = useState(true);

    const styles: any = useStyles().drawer;

    const [problemAlphabet, setProblemAlphabet] = useState<string[]>([]);
    const [problemAlphabetValue, setProblemAlphabetValue] = useState<string>("");
    const [errorAlphabet, setErrorAlphabet] = useState(false);
    const [states, setStates] = useState<stateType[]>([
        {id: 0, name: "begin", configurations: [{first: null, second:null, third: null, cross: false, char: "lambda"}]}
    ]);

    const validateProblemAlphabetValue = (value: string): boolean => {
        const splitted = value.split("\n");
        for (let i = 0; i < splitted.length; ++i) {
            let char = splitted[i];
            if (char.length > 4) {
                return false;
            }
        }
        return true;
    }

    const getProblemAlphabet = (value: string): string[] => {
        while (value.at(-1) == "\n") {
            value = value.slice(0, -1);
        }

        return removeDuplicates(value.split("\n").filter(x => x != "").sort().map((x) => {
            x = x.replace(" ", "");
            return x;
        }
        ))
    }

    const handleProblemAlphabetChange = (e: any) => {
        if (validateProblemAlphabetValue(e.target.value)) {
            setProblemAlphabetValue(e.target.value);
            setErrorAlphabet(false);
            setProblemAlphabet(getProblemAlphabet(e.target.value));
        } else {
            setErrorAlphabet(true);
        }

    }

    useEffect(() => {
        // handling  alphabet change
    
        const prevStates = states;
        let newStates: stateType[] = [];
        
        const max_id = Math.max(...prevStates.map((x) => x.id));
        for (let i = 0; i <= max_id; ++i) {
            const current_configurations = prevStates.filter((x) => x.id == i)[0].configurations;
            let newConfiguration: configurationType[] = [];
            for (let j = 0; j <= problemAlphabet.length; ++j) {
                let char = "";
                if (j == problemAlphabet.length) {
                    char = "lambda";
                } else {
                    char = problemAlphabet[i];
                }

                if (current_configurations.filter((x) => x.char == char).length != 0) {
                    newConfiguration.push(current_configurations.filter((x) => x.char == char)[0]);
                } else {
                    newConfiguration.push({first: null, second: null, third: null, cross: true, char: char});
                }
            } 
            newStates.push({
                id: i,
                name: prevStates.filter((x) => x.id == i)[0].name,
                configurations: newConfiguration
            });
        }
        setStates(newStates);
    }, [problemAlphabet])

    const getCharLatexRepr = (char: string): string => `{${char.length != 1 ? "\\overline{" : ""}`+char+`${char.length != 1 ? "}" : ""}}`;

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
                <Box sx={{fontSize: "40px"}}>
                    <TextField
                        label="Problem alphabet"
                        rows={4}
                        multiline
                        variant="outlined"
                        value={problemAlphabetValue}
                        onChange={handleProblemAlphabetChange}
                        sx={{
                            marginBottom: "20px",
                            fontSize: "30px"
                        }}
                        error={errorAlphabet}
                    />
                    <Typography variant="h4" sx={{overflow: "scroll"}}>
                        <Latex>
                            {`$A$=$\\{${
                                problemAlphabet
                                .map((char) => getCharLatexRepr(char))
                            }\\}$`}
                        </Latex>
                    </Typography>
                </Box>
            </Box>
            <Box sx={styles.table}>
                <TableContainer component={Paper} sx={{overflow: "scroll"}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>State \ Character</StyledTableCell>
                                {problemAlphabet.map((char) => (
                                    <StyledTableCell key={char} align="right">
                                        <Latex>
                                            {"$" + getCharLatexRepr(char) + "$"}
                                        </Latex>
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell align="right">
                                    <Latex>
                                        {"$\\pmb{\\lambda}$"}
                                    </Latex>
                                </StyledTableCell>
                                {/* <StyledTableCell align="right">Calories</StyledTableCell>
                                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {states.map((state) => (
                                    <StyledTableRow key={state.name}>
                                        <StyledTableCell>
                                                {state.name}
                                        </StyledTableCell>
                                        {state.configurations
                                        .map((x, index) => (
                                            <StyledTableCell key={index} align="right">
                                                <Latex>
                                                    $a$
                                                </Latex>
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                )
                            )}
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


export default TDrawerDeprecated;