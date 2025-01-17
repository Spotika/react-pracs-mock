import {Box, IconButton, Input, styled, TableCell, tableCellClasses, Typography} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {focusType} from "./ConfigCell.tsx";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

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

type Props = {
    stateName: string,
    stateId: number,
    focus: focusType | null,
    onClick: React.MouseEventHandler<HTMLTableCellElement>,
    setStateName: (from_state: string, to_state: string) => void
    validateState: (state: string) => boolean | undefined
    deleteState: (stateName: string) => void
}

const StateCell: FC<Props> = ({
                                  stateName,
                                  focus,
                                  onClick,
                                  validateState,
                                  setStateName,
                                  stateId,
                                  deleteState
                              }) => {

    const [prevFocus, setPrevFocus] = useState<boolean | null>(null);
    const isFocused = (focus?.isState == true) && (focus?.name == stateName);
    const [value, setValue] = useState(stateName);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (prevFocus === null) {
            setPrevFocus(isFocused);
            return;
        }
        if (isFocused) return;

        if (value != "" && !error && validateState(value) != undefined) {
            setStateName(stateName, value);
        }
        setValue(stateName);
    }, [isFocused]);

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (validateState(newValue) == false) {
            setError(true);
            return;
        }
        setError(false);

        setValue(newValue);
    };

    return <StyledTableCell onClick={onClick}>
        {isFocused ?
            (
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <IconButton onClick={
                        () => deleteState(stateName)
                    } disabled={stateId==0} color={"primary"} sx={{marginRight: "10px"}}>
                        <DeleteRoundedIcon />
                    </IconButton>
                    <Input
                        value={value}
                        size={"small"}
                        sx={{height: "24px"}}
                        onChange={handleValueChange}
                        autoFocus={true}
                        error={error}
                        fullWidth={true}
                    />
                </Box>
            )
            :
            (
                <Typography variant="body1">
                    {stateName}
                </Typography>
            )
        }
    </StyledTableCell>
}

export default StateCell;