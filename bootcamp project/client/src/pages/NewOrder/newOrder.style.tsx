import { styled } from '@mui/system';
import { PALLETE } from '../../config/config';

export const OpenDialog = styled('div')({
    cursor: "pointer !important"
})

export const DetailsDiv = styled('div')({
    width: "70% !important",
    display: 'inline-block',
    paddingBottom: "1rem",
})

export const BackImg = styled('div')({
    background: `${PALLETE.GRAY}`,
    height: "100% !important",
    width: "30% !important",
    position: "absolute",
    display: 'inline-block',
})

export const GiftImg = styled('img')({
    height:"100%",
    width: "100% ",
    marginBottom: "25%",
    marginTop: "70%",
    position:"relative",
    zIndex: 1, 
})

export const TextSide = styled('div')({
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: "25px",
    paddingRight: "25px",
    marginTop: 0,
})

export const MsdError = styled('div')({
    color: `${PALLETE.RED} !important `,
    fontSize: "11px",
})