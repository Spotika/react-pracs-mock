import {
    styled,
    TableCell,
    tableCellClasses,
    Box,
    Autocomplete,
    TextField,
} from "@mui/material"
import React, {FC, useEffect, useState} from "react";
import {TuringConfiguration, getLatexSetRepresentation} from "./ControlPanel.tsx";
import useStyles from "./Styles.tsx";
import Latex from "react-latex-next";
// import {useHotkeys} from "react-hotkeys-hook";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondaryContainer.main,
        color: theme.palette.onSecondaryContainer.main,
        border: theme.palette.outline.main,
        fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        borderBottom: 0
    },
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.surfaceContainerHigh.main,
        color: theme.palette.onSurface,
    },
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.surfaceContainerLowest.main,
        color: theme.palette.onSecondaryContainer
    },

    "&.focused": {
        // display: "none"
        backgroundColor: theme.palette.surfaceBright.main,
        // color: theme.palette.onPrimaryContainer.main
    }
}));

export type focusType = {
    name: string,
    char: string,
    isState: boolean
}

type Options = {
    states: string[],
    alphabets: string[]
}

type Props = {
    stateName: string,
    configuration: TuringConfiguration,
    focus: focusType | null,
    onClick: React.MouseEventHandler<HTMLTableCellElement>,
    options: Options,
    setConfiguration: (value: TuringConfiguration) => void
}

const ConfigCell: FC<Props> = (
    {
        stateName,
        configuration,
        focus,
        onClick,
        options,
        setConfiguration
    }
) => {
    const [prevFocus, setPrevFocus] = useState<boolean | null>(null);
    const isFocused = stateName == focus?.name && configuration.char == focus?.char && !focus?.isState;
    const styles = useStyles().configCell;


    const [firstValue, setFirstValue] = useState<string | null>(
        configuration.first
    );
    const [secondValue, setSecondValue] = useState<any | null>(
        configuration.second
    );
    const [thirdValue, setThirdValue] = useState<string | null>(
        configuration.third
    );

    const handleValueChange = (
        setter: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        return (_event: any, newValue: string | null) => {
            setter(newValue);
        }
    }

    useEffect(() => {
        if (prevFocus === null) {
            setPrevFocus(isFocused);
            return;
        }
        if (isFocused) return;
        // if focus turned off

        configuration.first = firstValue == "" ? null : firstValue;
        configuration.second = secondValue == "" ? null : secondValue;
        configuration.third = thirdValue == "" ? null : thirdValue;

        setConfiguration(configuration);

    }, [isFocused]);


    return <StyledTableCell
        onClick={onClick}
        align="right"
        sx={styles.root}
        className={isFocused ? "focused" : undefined}
    >
        {
            isFocused ?
                (
                    <Box sx={styles.input_container}>
                        <Autocomplete
                            options={options.alphabets}
                            autoComplete
                            includeInputInList
                            value={firstValue}
                            sx={styles.text_field}
                            onChange={handleValueChange(setFirstValue)}
                            renderInput={(params) => (
                                <TextField
                                    autoFocus={true}
                                    {...params}
                                    variant="standard"/>
                            )}
                        />
                        <Autocomplete
                            options={["left", "right"]}
                            autoComplete
                            value={secondValue}
                            includeInputInList
                            sx={styles.text_field}
                            onChange={handleValueChange(setSecondValue)}
                            renderInput={(params) => (
                                <TextField  {...params} variant="standard"/>
                            )}
                        />
                        <Autocomplete
                            options={options.states}
                            autoComplete
                            value={thirdValue}
                            includeInputInList
                            sx={styles.text_field}
                            onChange={handleValueChange(setThirdValue)}
                            renderInput={(params) => (
                                <TextField {...params} variant="standard"/>
                            )}
                        />
                    </Box>
                )
                :
                (
                    <Box>
                        <Latex>
                            {configuration.first === null
                            && configuration.second === null
                            && configuration.third === null ? "" : `
                             ${(configuration.first || "") == "lambda" ? 
                                "$\\lambda$" 
                                : 
                                "$"+getLatexSetRepresentation([configuration.first || " "])+"$"},
                             ${(configuration.second || "") == "" ? 
                                " "
                                :
                                {
                                    "": "",
                                    "left": "$\\leftarrow$",
                                    "right": "$\\rightarrow$"
                                }[configuration.second || ""] || ""
                            },
                            ${configuration.third || ""}
                             `}
                        </Latex>
                    </Box>
                )
        }
    </StyledTableCell>
}

export default ConfigCell;