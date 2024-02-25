import {styled, TableCell, tableCellClasses, Input} from "@mui/material"
import React, {FC} from "react";
import {TuringConfiguration} from "./ControlPanel.tsx";
import useStyles from "./Styles.tsx";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
        // backgroundColor: theme.palette.surface.main,
        // color: theme.palette.onPrimaryContainer.main
    }
}));

export type focusType = {
    name: string,
    char: string
}

type Props = {
    stateName: string,
    configuration: TuringConfiguration,
    focus: focusType | null,
    onClick: React.MouseEventHandler<HTMLTableCellElement>
}

const ConfigCell: FC<Props> = (
    {
        stateName,
        configuration,
        focus,
        onClick
    }
) => {

    const isFocused = stateName == focus?.name && configuration.char == focus?.char;
    const styles = useStyles().configCell;


    return <StyledTableCell
        onClick={onClick}
        align="right"
        sx={Object.assign({}, styles.root, styles.focused)}
        className={isFocused ? "focused" : undefined}
    >
        {
            isFocused ?
                (
                    <Input
                        sx={{height: "18px"}}
                        autoFocus={true}
                        fullWidth={true}
                        size={"small"}
                    />
                )
                :
                (1)
        }
    </StyledTableCell>
}

export default ConfigCell;