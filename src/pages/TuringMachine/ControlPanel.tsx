import React, {FC, useEffect, useRef, useState} from "react";
import {
    Box,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses, TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import useStyles from "./Styles.tsx";
import Latex from "react-latex-next";
import ConfigCell, {focusType} from "./ConfigCell.tsx";
import {useOnClickOutside} from "usehooks-ts";
import {useHotkeys} from "react-hotkeys-hook";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    "&:first-of-type": {
        minWidth: "400px",
    },

    [`&.${tableCellClasses.head}`]: {
        // overflowX: "initial",
        backgroundColor: theme.palette.secondaryContainer.main,
        color: theme.palette.onSecondaryContainer.main,
        borderBottom: `3px solid ${theme.palette.outline.main}`,
        fontSize: 20,
        minWidth: "100px",
        height: "10px"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        borderBottom: 0,
        // maxWidth: "100px",
        // minWidth: "100px",
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        border: 0,
        backgroundColor: theme.palette.surfaceContainerLowest.main,
    },
    // "&:nth-child(odd)": {
    //     display: "none"
    // },
    // hide last border
    '&:last-child tr, &:last-child td': {
        border: 0,
    },
}));

export class TuringConfiguration {
    first: string | null;
    second: "left" | "right" | null;
    third: string | null;
    cross: boolean;
    char: string;

    constructor(char: string,
                first: string | null = null,
                second: "left" | "right" | null = null,
                third: string | null = null,
                cross: boolean = false) {
        this.first = first;
        this.second = second;
        this.third = third;
        this.cross = cross;
        this.char = char;
    }
}

const validateA = (alphabet: string): boolean => {
    // validating alphabet string. Char 4 symbols
    const maxLen = 4;

    const incorrectChars = ",.:;\"\'"

    for (let i = 0; i < incorrectChars.length; ++i) {
        if (alphabet.includes(incorrectChars[i])) return false;
    }

    const chars = alphabet.split(" ");

    for (let i = 0; i < chars.length; ++i) {
        if (chars[i].length > maxLen) return false;
    }
    return true;
}

const removeDuplicates = (arr: string[]): string[] => {
    return arr.reduce((acc: any, curr: any) => {
        if (!acc.includes(curr))
            acc.push(curr);
        return acc;
    }, []);
}

const getProblemCustomA = (problemAInput: string, customAInput: string): {
    problemA: string[],
    customA: string[]
} => {
    const problemASplit = problemAInput.split(" ");
    const customASplit = customAInput.split(" ");
    const result = removeDuplicates(
        problemASplit
            .concat(
                customASplit
            ));

    let problemA: string[] = result.filter(
        elem => problemASplit.includes(elem) && elem != ""
    ).sort();
    let customA: string[] = result.filter(
        elem => !problemA.includes(elem) && elem != ""
    ).sort();

    return {
        problemA: problemA,
        customA: customA
    }
}

const getLatexSetRepresentation = (set: string[]): string[] => {

    const specialChars = "#$%&{}^"

    return set.map((elem) => {
        let result = "";
        for (let i = 0; i < elem.length; ++i) {
            if (specialChars.includes(elem[i])) {
                result = result + "\\" + elem[i];
            } else {
                result = result + elem[i];
            }
        }
        if (elem.length != 1) {
            result = "\\overline{" + result + "}"
        }
        return result;
    });
}


export type StateType = {
    id: number,
    name: string,
    configurations: TuringConfiguration[]
}

export type TuringOptionsType = {
    problemA: string[],
    customA: string[],
    states: StateType[];
}

type Props = {
    turingOptions: TuringOptionsType,
    setTuringOptions: React.Dispatch<React.SetStateAction<TuringOptionsType>>
}


const ControlPanel: FC<Props> = ({turingOptions, setTuringOptions}) => {

    const styles = useStyles().controlPanel;
    const [problemAInput, setProblemAInput] = useState<string>("");
    const [customAInput, setCustomAInput] = useState<string>("");
    const [customAError, setCustomAError] = useState<boolean>(false);
    const [problemAError, setProblemAError] = useState<boolean>(false);
    const [cellFocus,
        setCellFocus] = useState<focusType | null>(null);

    const tableRef = useRef(null);

    useOnClickOutside(tableRef, () => setCellFocus(null));

    useEffect(() => {
        setProblemAInput(turingOptions.problemA.join(" "));
        setCustomAInput(turingOptions.customA.join(" "));
    }, []);

    useEffect(() => {
        setTuringOptions((prevState: TuringOptionsType) => {
            const problemCustomA = getProblemCustomA(problemAInput, customAInput);
            prevState.problemA = problemCustomA.problemA;
            prevState.customA = problemCustomA.customA;

            let maxId = prevState.states.reduce((max, elem) => Math.max(elem.id, max), 0);
            let newStates: StateType[] = [];

            for (let i = 0; i <= maxId; ++i) {
                const currentState = prevState.states.filter(elem => elem.id == i)[0];
                let newConfigs: TuringConfiguration[] = [];
                for (let j = 0; j <= prevState.problemA.length; ++j) {
                    let currentChar = "";
                    if (j < prevState.problemA.length) {
                        currentChar = prevState.problemA[j];
                    } else {
                        currentChar = "lambda";
                    }
                    if (currentState
                        .configurations
                        .filter(elem => elem.char == currentChar)
                        .length == 0) {
                        newConfigs.push(
                            new TuringConfiguration(currentChar, null, null, null, true)
                        );
                    } else {
                        newConfigs.push(
                            currentState
                                .configurations
                                .filter(elem => elem.char == currentChar)
                                [0]
                        );
                    }
                }

                for (let j = 0; j < prevState.customA.length; ++j) {
                    const currentChar = prevState.customA[j];

                    if (currentState
                        .configurations
                        .filter(elem => elem.char == currentChar)
                        .length == 0) {
                        newConfigs.push(
                            new TuringConfiguration(currentChar, null, null, null, true)
                        );
                    } else {
                        newConfigs.push(
                            currentState
                                .configurations
                                .filter(elem => elem.char == currentChar)
                                [0]
                        );
                    }
                }

                currentState.configurations = newConfigs;
                newStates.push(currentState);
            }
            prevState.states = newStates;

            return {...prevState};
        });
    }, [problemAInput, customAInput]);

    // hotkeys
    useHotkeys("right", () => {
        console.log(123);
    })


    const handleChangeA = (
        setter: React.Dispatch<React.SetStateAction<string>>,
        errorSetter: React.Dispatch<React.SetStateAction<boolean>>
    ) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;

            if (!validateA(newValue)) {
                errorSetter(true);
                return;
            }
            errorSetter(false);
            setter(newValue);
        }


    return <Box sx={styles.root}>
        {/* Input */}
        <Box sx={styles.input_container}>
            <Box sx={styles.input}>
                <TextField
                    variant="outlined"
                    label={"Problem alphabet"}
                    value={problemAInput}
                    onChange={handleChangeA(setProblemAInput, setProblemAError)}
                    error={problemAError}
                />
                <TextField
                    variant="outlined"
                    label={"Custom alphabet"}
                    value={customAInput}
                    onChange={handleChangeA(setCustomAInput, setCustomAError)}
                    error={customAError}
                />
            </Box>
            <Box sx={styles.latex}>
                <Latex>
                    {"$A=\\{" + getLatexSetRepresentation(turingOptions.problemA) + "\\}$"}
                </Latex>
                <br/>
                <Latex>
                    {"$B=\\{" + getLatexSetRepresentation(turingOptions.customA) + "\\}$"}
                </Latex>
            </Box>
        </Box>
        {/* Table */}
        <Box sx={{flexGrow: 1}}>
            <TableContainer
                component={Paper}
                sx={styles.table}
                ref={tableRef}
            >
                <Table
                    aria-label="Input table"
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>State \ Character</StyledTableCell>
                            {getLatexSetRepresentation(turingOptions.problemA).map((elem) => (
                                <StyledTableCell key={elem} align="right">
                                    <Latex>
                                        {"$" + elem + "$"}
                                    </Latex>
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="right">
                                <Latex>
                                    {"$\\pmb{\\lambda}$"}
                                </Latex>
                            </StyledTableCell>
                            {getLatexSetRepresentation(turingOptions.customA).map((elem) => (
                                <StyledTableCell key={elem} align="right">
                                    <Latex>
                                        {"$" + elem + "$"}
                                    </Latex>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {turingOptions.states.map((state) => (
                            <StyledTableRow key={state.name}>
                                <StyledTableCell>
                                    {state.name}
                                </StyledTableCell>
                                {state.configurations.map((configuration) => (
                                    <ConfigCell
                                        stateName={state.name}
                                        focus={cellFocus}
                                        configuration={configuration}
                                        key={configuration.char}
                                        onClick={() => setCellFocus({
                                            char: configuration.char,
                                            name: state.name
                                        })}
                                    />
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Box>
}


export default ControlPanel;