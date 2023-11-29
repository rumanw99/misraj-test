import { TextField, TextFieldProps, styled } from '@mui/material';

export const FilledInput = styled((props: TextFieldProps) => (
    <TextField variant="filled" {...props} />
))(() => ({
    borderRadius: 19.6,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'inline-flex',
    '& .MuiInputBase-root::before , & .MuiInputBase-root::after': {
        display: 'none !important',
    },
    '& .MuiFilledInput-root': {
        borderRadius: 19.6,
    },
    '& .MuiInputLabel-filled': {
        transform: 'translate(14px, 16px) scale(1)',
    },
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
    },
    '& .MuiInputBase-input': {
        background: '#EBEBEB',
        padding: 14,
        borderRadius: 19.6,
    },
    '& .MuiInputBase-input::placeholder': {
        color: '#8D8D8D',
        fontSize: 21,
        fontFamily: 'Poppins',
        fontWeight: 400,
        lineHeight: 28,
        wordWrap: 'break-word',
    },
}));
